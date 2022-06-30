import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
const TrendingBlogs = ({ blog }) => {
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
    </Card>
  );
};

export default TrendingBlogs;
