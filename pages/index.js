import BlogCard from "../components/BlogCard";
import { Typography, Box } from "@mui/material";
import fetchData from "../helpers/fetchData";
export const getStaticProps = async () => {
  const url = `https://reactblog-strapi.herokuapp.com/api/blogs`;

  const data = await fetchData(url);
  return {
    props: {
      blogs: data,
    },
  };
};
const Blogs = ({ blogs }) => {
  return (
    <Box flex={8} p={{ xs: 0, md: 2 }}>
      <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
        All Blogs
      </Typography>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blogId={blog.id} blog={blog.attributes} />
      ))}
    </Box>
  );
};

export default Blogs;
