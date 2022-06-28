import Link from "next/link";
import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import fetchData from "../helpers/fetchData";
import Head from "next/head";
import { Box } from "@mui/system";
import ContentPaper from "../components/ContentPaper";
import ReactMarkdown from "react-markdown";
import { Endpoints } from "../Constants/endpoints";

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
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const url = `${Endpoints.getBlogById}/${id}`;

  const data = await fetchData(url);

  return {
    props: { post: data },
    revalidate: 1,
  };
};

const BlogDetails = ({ post }) => {
  return (
    <Box>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} />
      </Head>
      <ContentPaper>
        <article
          style={{
            marginTop: "2rem",
            textAlign: "justify",
          }}
        >
          <>
            <CardHeader
              sx={{ p: 0, mb: 2 }}
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <Typography variant="h4" sx={{ mb: 4 }}>
              {post.attributes.title}
            </Typography>
            <ReactMarkdown>{post.attributes.body}</ReactMarkdown>
            {/* <Typography variant="body1">{post.attributes.body}</Typography> */}
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
        <Divider sx={{ mt: 4, mb: 4 }} />
        {/* comment section */}
        <section>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Comments (0)
          </Typography>
          <CardHeader
            sx={{ p: 0, mb: 2 }}
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
              />
            }
          />

          <div style={{ textAlign: "right" }}>
            <Button variant="contained" color="primary">
              Post Comment
            </Button>
          </div>
        </section>
      </ContentPaper>
    </Box>
  );
};

export default BlogDetails;
