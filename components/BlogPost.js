import { Avatar, CardHeader, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import toDateTime from "../helpers/dateFormater";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const BlogPost = ({ username, blogDate, blogTitle, blogBody, blog }) => {
  return (
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
            {username.charAt(0)}
          </Avatar>
        }
        title={username}
        subheader={toDateTime(blogDate)}
      />
      <Typography variant="h4" sx={{ mb: 4 }}>
        {blogTitle}
      </Typography>
      <ReactMarkdown>{blogBody}</ReactMarkdown>
      {!blog && (
        <>
          <h2>blog Not Found</h2>
          <p>
            <Link href="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default BlogPost;
