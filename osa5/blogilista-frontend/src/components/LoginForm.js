const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {
	return (
		<div>
			<h2>Log in to the application</h2>
			<form onSubmit={handleSubmit}>
				<div>
              username
					<input
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={handleUsernameChange}
						placeholder='Enter username'
					/>
				</div>
				<div>
              password
					<input
						id='password'
						type='text'
						value={password}
						name='Password'
						onChange={handlePasswordChange}
						placeholder='Enter password'
					/>
				</div>
				<button
					id='login-button'
					type='submit'>
						login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;