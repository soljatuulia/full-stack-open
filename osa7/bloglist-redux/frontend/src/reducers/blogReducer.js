import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const id = action.payload;
      const blogToLike = state.find(b => b.id === id );
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state.map(b => b.id===id ? likedBlog : b);
    },
    replaceBlog(state, action) {
      const replacedBlog = action.payload;
      return state.map(b => b.id===replacedBlog.id ? replacedBlog : b);
    },
    removeBlog(state, action) {
      return state.filter(b => b !== action.payload);
    }
  }
});

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async dispatch => {
    const newBlog = await blogService.create(object);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 };
  return async dispatch => {
    const blog = await blogService.update(toLike);
    dispatch(replaceBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async dispatch => {
    const blogToDelete = await blogService.remove(id);
    dispatch(removeBlog(blogToDelete));
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, appendBlog, replaceBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;