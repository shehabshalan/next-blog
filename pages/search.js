import BlogCard from "../components/BlogCard";
import { Typography, Box, Grid } from "@mui/material";
import fetchData from "../helpers/fetchData";
import { Endpoints } from "../Constants/endpoints";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import PageHead from "../components/PageHead";

const SearchPage = () => {
  const { searchTerm } = useUserContext();
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  useEffect(() => {
    const url = `${Endpoints.searchBlogs}${searchTerm}`;
    const fetchBlogs = async () => {
      const data = await fetchData(url);
      setSearchedBlogs(data);
    };
    fetchBlogs();
  }, [searchTerm]);

  if (searchedBlogs?.length === 0) {
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
      <PageHead title="Next Blog" />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Blogs
          </Typography>
          {searchedBlogs.map((blog) => (
            <BlogCard key={blog.id} blogId={blog.id} blog={blog.attributes} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPage;
