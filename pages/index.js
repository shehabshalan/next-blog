import BlogCard from "../components/BlogCard";
import { Typography, Box, Grid } from "@mui/material";
import fetchData from "../helpers/fetchData";
import { Endpoints } from "../Constants/endpoints";
import PageHead from "../components/PageHead";
import TrendingBlogs from "../components/TrendingBlogs";
import { getTrendingBlogs } from "../helpers/trendingBlogs";
import { useEffect, useState } from "react";
export const getStaticProps = async () => {
  const url = Endpoints.getBlogs;

  const data = await fetchData(url);
  return {
    props: {
      blogs: data,
    },
    revalidate: 1,
  };
};
const Blogs = ({ blogs }) => {
  const [mostTrending, setMostTrending] = useState([]);

  useEffect(() => {
    setMostTrending(getTrendingBlogs(blogs));
  }, [blogs]);
  return (
    <>
      <PageHead title="Next Blog" />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={8} lg={8}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Blogs
          </Typography>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blogId={blog.id} blog={blog.attributes} />
          ))}
        </Grid>
        <Grid item xs={12} md={3} lg={4}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Trending 🔥
          </Typography>
          {mostTrending.map((blog) => (
            <BlogCard key={blog.id} blogId={blog.id} blog={blog.attributes} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Blogs;
