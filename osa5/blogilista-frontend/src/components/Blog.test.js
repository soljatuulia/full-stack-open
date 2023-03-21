import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders title and author', () => {
	const blog = {
		title: 'Test Blog',
		author: 'Test Blogger',
		url: 'www.test.com',
		likes: 1
	};

	const { container } = render(<Blog blog={blog} />);

	const div = container.querySelector('.blog-info');
	expect(div).toHaveTextContent('Test Blog');
	expect(div).toHaveTextContent('Test Blogger');
});

test('clicking the button displays url and likes', async () => {
	const blog = {
		title: 'Test Blog',
		author: 'Test Author',
		url: 'www.test.com',
		likes: 1,
		user: {
			username: 'user',
			name: 'Test User'
		}
	};

	const { container } = render(<Blog blog={blog} />);

	const user = userEvent.setup();
	const div = container.querySelector('.blog-info');
	const button = screen.getByText('view');
	await user.click(button);

	screen.debug();

	expect(div).toHaveTextContent('www.test.com');
	expect(div).toHaveTextContent('likes: 1');
});

test('clicking like button twice calls event handler twice', async () => {
	const blog = {
		title: 'Test Blog',
		author: 'Test Author',
		url: 'www.test.com',
		likes: 1,
		user: {
			username: 'user',
			name: 'Test User'
		}
	};

	const mockHandler = jest.fn();

	render(<Blog blog={blog} updateLikes={mockHandler} />);

	const user = userEvent.setup();
	const viewButton = screen.getByText('view');
	await user.click(viewButton);
	const likeButton = screen.getByText('like');
	await user.click(likeButton);
	await user.click(likeButton);

	screen.debug();

	expect(mockHandler.mock.calls).toHaveLength(2);

});
