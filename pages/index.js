import BlogCard from "../components/BlogCard";
import { Typography, Box, Container } from "@mui/material";

import useFetch from "../hooks/useFetch";
export const getStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`;

  const data = await useFetch(url);
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
