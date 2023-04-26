import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

/*
const Blog = ({ blog, like, canRemove, remove }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      {visible && (
        <div>
          <div>
            {" "}
            <a href={blog.url}> {blog.url}</a>{" "}
          </div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

*/

const Blog = () => {
  const getBlogs = useSelector(state => state.blogs);
  const blogs = [...getBlogs];
  //const dispatch = useDispatch();

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
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user && blog.user.name}
        </div>
        <button>delete</button>
      </div>
      )}
    </div>
  )

}

export default Blog;
