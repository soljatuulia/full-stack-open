const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
});

describe('all blogs', () => {
	test('can be returned', async () => {
		const response = await api.get('/api/blogs');
  
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});
  
	test('have id field', async () => {
		const response = await api.get('/api/blogs');
  
		response.body.forEach(blog => {
			expect(blog.id).toBeDefined();
		});
	});
});

describe('adding a new blog', () => {
	test('succeeds and its content type is correct', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12
		};
  
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
  
		const response = await api.get('/api/blogs');
  
		const title = response.body.map(res => res.title);
  
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
		expect(title).toContain('Canonical string reduction');
	});

	test('with undefined likes value sets likes to zero', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
		};
  
		await api
			.post('/api/blogs')
			.send(newBlog);
  
		const response = await api.get('/api/blogs');
  
		expect(response.body.likes).toBeDefined;
  
	});

	test('fails with status code 400 if title is missing', async () => {
		const newBlog = {
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12      
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400);
	});

	test('fails with status code 400 if url is missing', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12
		};
  
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400);
	});
});

describe('updating blog info', () => {
	test('succeeds with status code 200 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];
		const updateInfo = {
			...blogToUpdate,
			likes: 99
		};

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updateInfo)
			.expect(200);

		const blogsAtEnd = await helper.blogsInDb();
		const updatedBlog = blogsAtEnd[0];

		expect(updatedBlog.likes).toBe(99);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		);

		const titles = blogsAtEnd.map(r => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	});

	test('creation succeeds with a unique username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'kayttaja',
			name: 'Jaska Jokunen',
			password: 'salainen'
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with status code 401 and message if username is already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username already exists');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('creation fails with status code 401 and message if username is not given', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			name: 'Jaska Jokunen',
			password: 'salainen'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username or password missing');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);		
	});

	test('creation fails with status code 401 and message if password is not given', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'kayttaja',
			name: 'Jaska Jokunen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username or password missing');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);		
	});	

	test('creation fails with status code 401 and message if username is too short', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'jj',
			name: 'Jaska Jokunen',
			password: 'salainen'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username and password must be longer than 3 characters');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);		
	});	
	
	test('creation fails with status code 401 and message if password is too short', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'kayttaja',
			name: 'Jaska Jokunen',
			password: 'pw'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username and password must be longer than 3 characters');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);		
	});			
});
  
afterAll(async () => {
	await mongoose.connection.close();
});