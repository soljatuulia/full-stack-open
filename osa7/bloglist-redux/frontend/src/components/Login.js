import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { loginUser } from '../reducers/loginReducer';

const Login = ({ login }) => {
  const dispatch = useDispatch();

  const { reset: resetUsername, ...username } = useField('username');
  const { reset: resetPassword, ...password } = useField('password');

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username.value, password.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input { ...username } />
      </div>
      <div>
        password
        <input { ...password } />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default Login;