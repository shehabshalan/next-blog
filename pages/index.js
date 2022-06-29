import BlogCard from "../components/BlogCard";
import { Typography, Box, Grid } from "@mui/material";
import fetchData from "../helpers/fetchData";
import { Endpoints } from "../Constants/endpoints";
import LeftsideBar from "../components/LeftsideBar";
import ContentCard from "../components/ContentCard";
import Head from "next/head";

export const getServerSideProps = async () => {
  const url = Endpoints.getBlogs;

  const data = await fetchData(url);
  return {
    props: {
      blogs: data,
    },
  };
};
const Blogs = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Next Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={2} lg={2}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Tags
          </Typography>
          <LeftsideBar />
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Blogs
          </Typography>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blogId={blog.id} blog={blog.attributes} />
          ))}
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            News
          </Typography>
          <ContentCard />
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Trend
          </Typography>
          <ContentCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Blogs;
