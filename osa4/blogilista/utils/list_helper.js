const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const likes = blogs.map((blog) => blog.likes);
  
	const likesInTotal = likes.reduce(
		(total, current) => {
			return total + current; 
		}, 0);

	return likesInTotal;
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
  
	const likes = blogs.map((blog) => blog.likes);
	const mostLikes = likes.reduce(
		(acc, cur) => Math.max(acc, cur));
	const indexOfFave = likes.indexOf(mostLikes);
  
	const favorite = blogs[indexOfFave];
	delete favorite._id;
	delete favorite.url;
	delete favorite.__v;

	return favorite;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};