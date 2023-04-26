import { useSelector } from "react-redux";
import { setNotification, displayNotification, emptyNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  console.log('Notification / state.notification: ', notification);
  
  if (!notification) {
    return null;
  }
  
  const style = {
    color: notification.type==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification;