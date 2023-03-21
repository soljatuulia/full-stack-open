import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> calls its callback function given as props with right data', async () => {
	const user = userEvent.setup();
	const createBlog = jest.fn();

	render(<BlogForm createBlog={createBlog} />);

	const titleInput = screen.getByPlaceholderText('enter title');
	const authorInput = screen.getByPlaceholderText('enter author');
	const urlInput = screen.getByPlaceholderText('enter url');
	const sendButton = screen.getByText('create');

	await user.type(titleInput, 'Blog Title');
	await user.type(authorInput, 'Blog Author');
	await user.type(urlInput, 'www.blog.url');
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0]).toEqual({
		title: 'Blog Title',
		author: 'Blog Author',
		url: 'www.blog.url'
	});
});