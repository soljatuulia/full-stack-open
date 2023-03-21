import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	// eslint-disable-next-line  no-unused-vars
	const [newUrl, setNewUrl] = useState('');

	const [message, setMessage] = useState(null);
	const [messageType, setMessageType] = useState('');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		);
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogilistaUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const blogFormRef = useRef();

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log('logging in with', username, password);

		try {
			const user = await loginService.login({
				username, password,
			});
			blogService.setToken(user.token);
			window.localStorage.setItem(
				'loggedBlogilistaUser', JSON.stringify(user)
			);

			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
			setMessage(`Welcome ${user.name}!`);
			setMessageType('success');
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage('Wrong username or password');
			setMessageType('error');
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const logout = () => {
		console.log('logging out');
		window.localStorage.removeItem('loggedBlogilistaUser');
		setUser(null);
		setMessage('You have been logged out');
		setMessageType('success');
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	};

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog));
				setNewTitle('');
				setNewAuthor('');
				setNewUrl('');
				setMessage(`A new blog ${newTitle} by ${newAuthor} was added`);
				setMessageType('success');
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			})
		// eslint-disable-next-line  no-unused-vars
			.catch(error => {
				setMessage('Unable to add blog');
				setMessageType('error');
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
	};

	const updateLikes = id => {
		const blog = blogs.find(b => b.id === id);

		const blogObject = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			user: blog.user,
			likes: blog.likes + 1
		};

		blogService
			.update(id, blogObject)
			.then(returnedBlog => {
				setBlogs(
					blogs.map(b => (b.id === returnedBlog.id ? returnedBlog : b))
				);
			});
	};

	const deleteBlog = (blog) => {
		if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
			blogService
				.remove(blog.id)
				.then(setBlogs(blogs.filter((b) => b.id !== blog.id)));
		}
	};

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
					password
					<input
						type="text"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)} />
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);

	const blogList = () => (
		<div>
		  <h2>Blogs</h2>
  		<p>{user.name} logged in
	  			<button type="logout"
		 			onClick={logout}>logout</button>
		  </p>

			<Togglable buttonLabel="create" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

		  {blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog =>
			  <Blog key={blog.id} blog={blog} savedBy={user.username}
						updateLikes={updateLikes} deleteBlog={deleteBlog} />
		  )}
		</div>
	);

	return (
		<div>
			<Notification message={message} type={messageType} />
			{!user && loginForm()}
			{user && blogList()}
		</div>
	);
};

export default App;