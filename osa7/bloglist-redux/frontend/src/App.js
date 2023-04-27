import { useState, useEffect, useRef } from "react";
import { setNotification, displayNotification, emptyNotification } from './reducers/notificationReducer';
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  //const [info, setInfo] = useState({ message: null });

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);
/*
  const notifyWith = (message, type = "info") => {
    setInfo({
      message,
      type,
    });

    setTimeout(() => {
      setInfo({ message: null });
    }, 3000);
  };
*/

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      dispatch(setNotification('welcome!', 'info'));
    } catch (e) {
      dispatch(setNotification('wrong username or password', 'error'));
      }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    dispatch(setNotification('logged out', 'info'));
  };

  const createBlog = async (newBlog) => {
    /*
    const createdBlog = await blogService.create(newBlog);
    dispatch(setNotification(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 'info'));
    setBlogs(blogs.concat(createdBlog));
    blogFormRef.current.toggleVisibility();
    */
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, 'info'));
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`, 'info'
    );
    if (ok) {
      await blogService.remove(blog.id);
      dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`, 'info'));
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  //const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <div>
      <Blog />
      </div>
    </div>
  );
};

export default App;
