import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";

const CommentFeed = ({ comment }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemAvatar>
            <Avatar alt={comment.username} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.username}
            secondary={<React.Fragment>{comment.commentBody}</React.Fragment>}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default CommentFeed;
