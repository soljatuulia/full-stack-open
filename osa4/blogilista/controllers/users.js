const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (!username || !password) {
		return response
			.status(401)
			.json({ error: 'username or password missing' });
	}

	if (username.length < 3 || password.length < 3) {
		return response
			.status(401)
			.json({ error: 'username and password must be longer than 3 characters' });
	}

	const alreadyExists = await User.findOne({ username });

	if (alreadyExists) {
		return response
			.status(401)
			.json({ error: 'username already exists' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (request, response) => {
	await User.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = usersRouter;