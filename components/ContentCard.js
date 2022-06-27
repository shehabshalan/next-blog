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

const ContentCard = () => {
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
        title="How to use Next.js with Material-UI"
        // subheader={toDateTime(blog.datetime.seconds)}
      />
      <Link href={`#`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ContentCard;
