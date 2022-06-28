import ContentPaper from "../components/ContentPaper";
import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { Endpoints } from "../Constants/endpoints";
import { useRouter } from "next/router";

import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
const PostForm = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      data: {
        title: data.get("title"),
        body: data.get("body"),
        userId: user.userId,
      },
    };
    console.log(payload);
    setLoading(true);
    const url = Endpoints.getBlogs;
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("blog published", response.data);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <ContentPaper>
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
            Create blog
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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              label="Body"
              type="textarea"
              id="body"
              multiline
              rows={4}
            />
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Publish{" "}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </ContentPaper>
  );
};

export default PostForm;
