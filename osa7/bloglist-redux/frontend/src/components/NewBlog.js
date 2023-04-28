import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useField } from '../hooks/index';
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import Togglable from "./Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();

  const { reset: resetTitle, ...title } = useField('title');
  const { reset: resetAuthor, ...author } = useField('author');
  const { reset: resetUrl, ...url } = useField('url');

  const blogFormRef = useRef();

  const blogObject = (event) => {
    event.preventDefault();
    addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    });
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog));
    dispatch(setNotification(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 'info'));
    //setBlogs(blogs.concat(createdBlog));
    //blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={blogObject}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit" onClick={blogObject}>create</button>
      </form>
    </div>
  );
};

export default BlogForm;