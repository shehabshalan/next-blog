import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { Endpoints } from "../../Constants/endpoints";
import ContentPaper from "../../components/ContentPaper";
import fetchData from "../../helpers/fetchData";
import { useUserContext } from "../../context/UserContext";
import { uuid } from "uuidv4";
import { blue } from "@mui/material/colors";

import axios from "axios";
import AuthModal from "../../components/AuthModal";
import UserProfile from "../../components/UserProfile";
import CommentSection from "../../components/CommentSection";
import BlogPost from "../../components/BlogPost";
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

const BlogDetails = ({ blog }) => {
  const { user, setOpen } = useUserContext();
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
      <PageHead title={blog.attributes.title} />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={12} md={12} lg={8}>
          {/* blog content */}
          <ContentPaper>
            <BlogPost
              username={blog.attributes.username}
              blogDate={blog.attributes.createdAt}
              blogTitle={blog.attributes.title}
              blogBody={blog.attributes.body}
              blog={blog}
            />
            <Divider sx={{ mt: 4, mb: 4 }} />
            {/* comment section */}
            <section>
              <AuthModal />
              <CommentSection
                comments={comments}
                commentBody={comment.commentBody}
                handleCommentChange={handleCommentChange}
                user={user}
                setOpen={setOpen}
                handleCommentSubmit={handleCommentSubmit}
                commentEmpty={commentEmpty}
              />
            </section>
          </ContentPaper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4}>
          {/* author information such as username, joined date */}
          <UserProfile
            username={blog.attributes.username}
            joinDate={blog.attributes.createdAt}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BlogDetails;
