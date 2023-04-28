import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    emptyUser(state, action) {
      return null;
    }
  }
});

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("bloggappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }
};

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("bloggappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification('welcome!', 'info'));
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error'));
    }
  }
};

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("bloggappUser");
    blogService.setToken(null);
    dispatch(emptyUser());
    dispatch(setNotification('logged out', 'info'));
  }
};

export const { setUser, emptyUser } = loginReducer.actions;
export default loginReducer.reducer;