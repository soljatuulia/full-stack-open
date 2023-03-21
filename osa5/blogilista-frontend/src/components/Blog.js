import { useState } from 'react';

const Blog = ({ blog, savedBy, updateLikes, deleteBlog }) => {
	const [showDetails, setShowDetails] = useState(false);

	if (showDetails === false) {
		return (
			<div className="blog-info">
				{blog.title} {blog.author}
				<button id='view-button' onClick={() => setShowDetails(true)}>view</button>
			</div>
		);
	}

	if (showDetails === true) {
		return (
			<div className="blog-details">
				{blog.title} {blog.author}
				<button onClick={() => setShowDetails(false)}>hide</button><br />
				{blog.url} <br />
        likes: {blog.likes}
				<button id='like-button' onClick={() => updateLikes(blog.id)}>like</button><br />
				{blog.user.name}
				{savedBy === blog.user.username
					? (<button onClick={() => deleteBlog(blog)}>delete</button>)
					: (<div></div>)
				}
			</div>
		);
	}
};

export default Blog;