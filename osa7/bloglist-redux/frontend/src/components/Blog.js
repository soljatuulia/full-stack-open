import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const getBlogs = useSelector(state => state.blogs);
  const blogs = [...getBlogs];
  const dispatch = useDispatch();

  const like = (blog) => {
    dispatch(likeBlog(blog));
    console.log('Blog / like / blog is: ', blog);
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, 'info'));
  };

  const remove = (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`, 'info'
    );
    if (ok) {
      dispatch(deleteBlog(blog.id));
      console.log('Blog / delete / blog is: ', blog);
      dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`, 'info'));
    }
  };

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  return (
    <div>
      {blogs.sort((b1, b2) => b2.likes - b1.likes)
            .map(blog =>
      <div key={blog.id} style={style} className="blog">
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>  
        <div>
          likes {blog.likes} 
          <button onClick={() => like(blog)}>like</button>
        </div>
        <div>
          {blog.user && blog.user.name}
        </div>
        <button onClick={() => remove(blog)}>delete</button>
      </div>
      )}
    </div>
  )

}

export default Blog;