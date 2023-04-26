import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      console.log('displayNotification action.payload: ', action.payload);
      const { message, type } = action.payload;
      return { message, type };
    },
    emptyNotification(state, action) {
      return '';
    }
  }
});

export const setNotification = (message, type) => {
  return async dispatch => {
    dispatch(displayNotification({ message, type }));
    console.log('message is ', message);
    console.log('type is ', type)
    await setTimeout(() => {
      dispatch(emptyNotification())
  }, 3000);
  };
};

export const { displayNotification, emptyNotification } = notificationSlice.actions;
export default notificationSlice.reducer;