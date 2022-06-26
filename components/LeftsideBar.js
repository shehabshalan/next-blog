import { Card, CardContent } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import TagIcon from "@mui/icons-material/Tag";
const LeftsideBar = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="programming" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="javascript" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default LeftsideBar;
