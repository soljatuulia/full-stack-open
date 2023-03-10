const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;
	const decodedToken = jwt.verify(request.token,
		process.env.SECRET);
	
	if (!decodedToken.id || !request.token) {
		return response.status(401).json({ error: 'token invalid or missing'});
	}

	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	});

	if (!blog.title || !blog.url) {
		return response.status(400).json({
			error: 'title or url missing'
		});
	}

	const savedBlog = await blog.save();
	
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	
	response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body;

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, blog, { new: true });
	
	response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token,
		process.env.SECRET);
	const blog = await Blog.findById(request.params.id);
	const user = await User.findById(blog.user);

	if (!decodedToken.id || !request.token) {
		return response.status(401).json({ error: 'token invalid or missing'});
	}	

	if (user.id.toString() === decodedToken.id.toString()) {
		await Blog.findByIdAndRemove(blog.id);
		response.status(204).end();
	} else {
		response.status(400).end();
	}	
});

module.exports = blogsRouter;