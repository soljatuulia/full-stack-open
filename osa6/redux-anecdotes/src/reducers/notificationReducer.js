import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    emptyNotification(state, action) {
      return '';
    }
  }
});

/*
export const setNotification = (text, time) => {
  const timeout = time * 1000;
  return async dispatch => {
    dispatch(displayNotification(text));
    setTimeout(() => dispatch(emptyNotification(timeout), timeout))
  };
};
*/

export const { displayNotification, emptyNotification } = notificationSlice.actions;
export default notificationSlice.reducer;