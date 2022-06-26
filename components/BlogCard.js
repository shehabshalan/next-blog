import {
  Favorite,
  FavoriteBorder,
  ThumbUpOffAlt,
  ThumbUpAlt,
  ChatBubbleOutline,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";

const BlogCard = ({ blog, blogId }) => {
  return (
    <Card
      sx={{
        mb: { xs: 0, md: 2 },
        mt: { xs: 2 },
        maxWidth: "700px",
        cursor: "pointer",
      }}
    >
      <CardHeader
        title={blog.title}
        // subheader={toDateTime(blog.datetime.seconds)}
      />
      <Link href={`/${blogId}`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog.body.length <= 25
              ? blog.body
              : `${blog.body.slice(0, 300)} ...`}
          </Typography>
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        <IconButton aria-label="love this">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            title="Love this"
          />
        </IconButton>
        Love
        <IconButton aria-label="like this">
          <Checkbox
            icon={<ThumbUpOffAlt />}
            checkedIcon={<ThumbUpAlt sx={{ color: "blue" }} />}
            title="Like this"
          />
        </IconButton>
        Like
      </CardActions>
    </Card>
  );
};

export default BlogCard;
