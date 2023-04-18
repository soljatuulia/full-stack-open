import { createContext, useContext, useReducer } from 'react';

const AnecdoteContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default: 
      return state;
  };
};

export const useMessageValue = () => {
  const messageAndDispatch = useContext(AnecdoteContext);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(AnecdoteContext);
  return messageAndDispatch[1];
};

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
};

export default AnecdoteContext;