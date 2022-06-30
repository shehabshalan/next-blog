// get three most trending blogs based on comment count
export const getTrendingBlogs = (blogs) => {
  return blogs
    .sort((a, b) => {
      return b.attributes.comments.length - a.attributes.comments.length;
    })
    .slice(0, 3);
};
