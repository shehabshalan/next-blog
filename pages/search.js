import BlogCard from "../components/BlogCard";
import { Typography, Box, Grid } from "@mui/material";
import fetchData from "../helpers/fetchData";
import { Endpoints } from "../Constants/endpoints";
import LeftsideBar from "../components/LeftsideBar";
import ContentCard from "../components/ContentCard";
import Head from "next/head";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const { searchTerm } = useUserContext();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const url = `${Endpoints.searchBlogs}${searchTerm}`;
    const fetchBlogs = async () => {
      const data = await fetchData(url);
      setBlogs(data);
    };
    fetchBlogs();
  }, [searchTerm]);

  if (blogs?.length === 0) {
    return (
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
        }}
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Typography component="h1" variant="h5">
            No blogs found
          </Typography>
        </Box>
      </Box>
    );
  }

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

export default SearchPage;
