import React, { useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";
import Head from "next/head";
import { Endpoints } from "../../Constants/endpoints";
import ContentPaper from "../../components/ContentPaper";
import fetchData from "../../helpers/fetchData";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/UserContext";
import Link from "next/link";
import PageHead from "../../components/PageHead";
export const getStaticPaths = async () => {
  const url = Endpoints.getBlogs;
  const data = await fetchData(url);

  const paths = data.map((path) => {
    return {
      params: { id: path.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const url = `${Endpoints.getBlogById}/${id}`;

  const data = await fetchData(url);

  return {
    props: { blog: data },
    revalidate: 1,
  };
};

const EditBlogDetails = ({ blog }) => {
  const { user } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(blog?.attributes?.title);
  const [body, setBody] = React.useState(blog?.attributes?.body);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      data: {
        title: title,
        body: body,
      },
    };
    const url = `${Endpoints.updateBlog}/${blog.id}`;
    axios
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  };
  if (!blog) {
    return <div>Loading...</div>;
  }

  if (blog?.attributes?.userId !== user?.userId) {
    return (
      <ContentPaper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h4">
            You are not authorized to edit this blog
          </Typography>
          <Typography variant="h5">
            Please go back to the <Link href="/">home page</Link>
          </Typography>
        </Box>
      </ContentPaper>
    );
  }
  return (
    <>
      <PageHead title={blog.attributes.title} />
      <ContentPaper>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            width: "100%",
          }}
        >
          <Box sx={{ maxWidth: "500px" }}>
            <Typography component="h1" variant="h5">
              Edit blog
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="body"
                label="Body"
                type="textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                id="body"
                multiline
                rows={12}
              />
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Publish changes{" "}
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </ContentPaper>
    </>
  );
};

export default EditBlogDetails;
