import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [newUrl, setNewUrl] = useState('');

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl
		});

		setNewTitle('');
		setNewAuthor('');
		setNewUrl('');
	};

	return (
	  <div>
  	  <h2>Create new</h2>
    	 	<form onSubmit={addBlog}>
				<div>
      			title: <input
						value={newTitle}
						id='title'
						onChange={event => setNewTitle(event.target.value)}
						placeholder='enter title' />
	        </div>
  	      <div>
    	      author: <input
						value={newAuthor}
						id='author'
						onChange={event => setNewAuthor(event.target.value)}
						placeholder='enter author' />
      	  </div>
        	<div>
	          url: <input
						value={newUrl}
						id='url'
						onChange={event => setNewUrl(event.target.value)}
						placeholder='enter url' />
  	      </div>
    	    <div>
      	    <button id='create-button' type="submit">create</button>
        	</div>
	      </form>
  	</div>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
};

export default BlogForm;