import React from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Head from "next/head";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";
import { Endpoints } from "../../Constants/endpoints";
import ContentPaper from "../../components/ContentPaper";
import fetchData from "../../helpers/fetchData";
import toDateTime from "../../helpers/dateFormater";
import CommentFeed from "../../components/CommentFeed";
import { useUserAuth } from "../../context/UserAuthContext";
import { uuid } from "uuidv4";
import axios from "axios";
import mutateData from "../../helpers/mutateData";
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

const BlogDetails = ({ blog }) => {
  const { user } = useUserAuth();
  const [comment, setComment] = React.useState({
    commentId: null,
    userId: null,
    username: null,
    commentBody: "",
  });
  const [comments, setComments] = React.useState(
    !blog?.attributes?.comments ? [] : blog.attributes.comments
  );

  const [commentEmpty, setCommentEmpty] = React.useState(true);
  const handleCommentChange = (event) => {
    setComment({
      commentId: uuid(),
      userId: user?.userId,
      username: user?.username,

      commentBody: event.target.value,
    });

    setCommentEmpty(event.target.value.length < 1);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const url = `${Endpoints.updateBlog}/${blog.id}`;
    const payload = {
      data: {
        comments: [...comments, comment],
      },
    };
    setComments([...comments, comment]);
    axios
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setComment({
          commentId: null,
          userId: null,
          username: null,
          commentBody: "",
        });
        setCommentEmpty(true);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{blog.attributes.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <ContentPaper>
            <article
              style={{
                marginTop: "2rem",
                textAlign: "justify",
              }}
            >
              <CardHeader
                sx={{ p: 0, mb: 2 }}
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {blog.attributes.username.charAt(0)}
                  </Avatar>
                }
                title={blog.attributes.username}
                subheader={toDateTime(blog.attributes.createdAt)}
              />
              <Typography variant="h4" sx={{ mb: 4 }}>
                {blog.attributes.title}
              </Typography>
              <ReactMarkdown>{blog.attributes.body}</ReactMarkdown>
              {/* <Typography variant="body1">{blog.attributes.body}</Typography> */}

              {!blog && (
                <>
                  <h2>blog Not Found</h2>
                  <p>
                    <Link href="/">Visit Our Homepage</Link>
                  </p>
                </>
              )}
            </article>
            <Divider sx={{ mt: 4, mb: 4 }} />
            {/* comment section */}
            <section>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Comments ({comments?.length > 0 ? comments.length : 0})
              </Typography>
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <CommentFeed key={comment.commentId} comment={comment} />
                ))
              ) : (
                <p>No comments yet</p>
              )}
              <CardHeader
                sx={{ p: 0, mb: 2, mt: 4 }}
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    value={comment.commentBody}
                    onChange={handleCommentChange}
                  />
                }
              />

              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCommentSubmit}
                  disabled={commentEmpty}
                >
                  Comment
                </Button>
              </div>
            </section>
          </ContentPaper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4}>
          {/* author information such as username, joined date, email */}
          <ContentPaper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: blue[500],
                }}
                alt="An image of the author"
              >
                {blog.attributes.username.charAt(0)}
              </Avatar>
              <Typography component="h1" variant="h5">
                {blog.attributes.username}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
              <Typography variant="body1">
                <strong>Joined</strong> <br />{" "}
                {toDateTime(blog.attributes.createdAt)}
              </Typography>
            </Box>
          </ContentPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogDetails;
