import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import mutateData from "../helpers/mutateData";
import { Endpoints } from "../Constants/endpoints";
import { useRouter } from "next/router";
import toDateTime from "../helpers/dateFormater";
const options = ["Delete", "Edit"];

const ITEM_HEIGHT = 48;

const BlogCard = ({ blog, blogId }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleYesDelete = () => {
    mutateData(`${Endpoints.deleteBlog}/${blogId}`);

    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    // console log the value of the selected option
    const selectedOption = e.target.innerText;
    if (selectedOption === "Delete") {
      handleClickOpenDialog();
    }
    if (selectedOption === "Edit") {
      router.push(`/editblog/${blogId}`);
    }
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        mb: { xs: 0, md: 2 },
        mt: { xs: 2 },
        width: "100%",
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
        subheader={toDateTime(blog.createdAt)}
      />
      <Link href={`/blog/${blogId}`}>
        <CardHeader
          title={blog.title}
          // subheader={toDateTime(blog.datetime.seconds)}
        />
      </Link>
      <Link href={`/blog/${blogId}`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog.body.length <= 25
              ? blog.body
              : `${blog.body.slice(0, 300)} ...`}
          </Typography>
        </CardContent>
      </Link>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this blog?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleYesDelete} color="error">
            Yes
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BlogCard;
