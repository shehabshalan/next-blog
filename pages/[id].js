import Link from "next/link";
import { Typography } from "@mui/material";
import fetchData from "../helpers/fetchData";

export const getStaticPaths = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`;
  const data = await fetchData(url);

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

  const data = await fetchData(url);

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
          <p>
            <Link href="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default BlogDetails;
