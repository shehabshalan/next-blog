import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";

const BlogCard = ({ blog, blogId }) => {
  return (
    <Card
      sx={{
        mb: { xs: 0, md: 5 },
        mt: { xs: 2 },
        maxWidth: "900px",
        cursor: "pointer",
      }}
    >
      <CardHeader
        title={blog.title}
        // subheader={toDateTime(blog.datetime.seconds)}
      />
      <Link href={`/blogs/${blogId}`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog.body.length <= 25
              ? blog.body
              : `${blog.body.slice(0, 300)} ...`}
          </Typography>
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        {/* <IconButton aria-label="share">
          <Share />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default BlogCard;
