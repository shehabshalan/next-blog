import useFetch from "../hooks/useFetch";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export const getStaticPaths = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`;
  const data = await useFetch(url);

  const paths = data.map((path) => {
    return {
      params: { id: path.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`;

  const data = await useFetch(url);

  return {
    props: { post: data },
  };
};
const BlogDetails = ({ post }) => {
  return (
    <article
      style={{
        marginTop: "2rem",
        textAlign: "justify",
      }}
    >
      <>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {post.attributes.title}
        </Typography>
        <Typography variant="body1">{post.attributes.body}</Typography>
      </>

      {!post && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link href="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default BlogDetails;
