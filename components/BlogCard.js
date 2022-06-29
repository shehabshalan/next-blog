import React from "react";
import {
  Favorite,
  FavoriteBorder,
  ThumbUpOffAlt,
  ThumbUpAlt,
  ChatBubbleOutline,
} from "@mui/icons-material";
import {
  Avatar,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import Link from "next/link";
import { useUserAuth } from "../context/UserAuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import mutateData from "../helpers/mutateData";
import { Endpoints } from "../Constants/endpoints";
const options = ["Delete", "Edit"];

const ITEM_HEIGHT = 48;

const BlogCard = ({ blog, blogId }) => {
  const { user } = useUserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    // console log the value of the selected option
    const selectedOption = e.target.innerText;
    if (selectedOption === "Delete") {
      mutateData(`${Endpoints.deleteBlog}/${blogId}`);
    }
    if (selectedOption === "Edit") {
      console.log("edit");
    }
    setAnchorEl(null);
  };

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
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.username.charAt(0)}
          </Avatar>
        }
        action={
          <>
            {user?.userId === blog.userId ? (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                      left: "850px",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : null}
          </>
        }
        title={blog.username}
        // subheader="September 14, 2016"
      />
      <CardHeader
        title={blog.title}
        // subheader={toDateTime(blog.datetime.seconds)}
      />
      <Link href={`/blog/${blogId}`}>
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
