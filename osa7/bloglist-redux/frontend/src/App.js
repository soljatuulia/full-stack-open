import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLogin, logoutUser } from "./reducers/loginReducer";

import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeBlogs())
  }, [dispatch]);

  if (!user | user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={() => dispatch(logoutUser())}>logout</button>
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