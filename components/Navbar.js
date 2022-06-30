import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Box,
} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import SearchBar from "./Search";
import { useState } from "react";
const Navbar = () => {
  const { isAuth, logout } = useUserContext();
  const [state, setState] = useState(false);

  const toggleDrawerOpen = () => {
    setState(true);
  };
  const toggleDrawerClose = () => {
    setState(false);
  };

  const mobileMenu = () => (
    <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
      <Grid item xs={2} md={2} lg={2}>
        <IconButton
          aria-label="delete"
          onClick={toggleDrawerOpen}
          color="secondary"
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawerClose}
          onOpen={toggleDrawerOpen}
        >
          <Box sx={{ width: "250px" }}>
            {isAuth ? (
              <List sx={{ p: 2 }}>
                <ListItem disablePadding>
                  <Link href="/createblog">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 2, mr: 2 }}
                      onClick={toggleDrawerClose}
                      fullWidth
                    >
                      Create Blog
                    </Button>
                  </Link>
                </ListItem>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <ListItem disablePadding>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={logout}
                    fullWidth
                  >
                    Logout
                  </Button>
                </ListItem>
              </List>
            ) : (
              <List sx={{ p: 2 }}>
                <ListItem disablePadding>
                  <Link href="/register">
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={toggleDrawerClose}
                    >
                      Create account
                    </Button>
                  </Link>
                </ListItem>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <ListItem disablePadding>
                  <Link href="/login">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={toggleDrawerClose}
                    >
                      Login
                    </Button>
                  </Link>
                </ListItem>
              </List>
            )}
          </Box>
        </SwipeableDrawer>
      </Grid>
    </Box>
  );
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={2} md={2} lg={2}>
              <Link href="/">
                <Typography variant="h6" noWrap component="div">
                  NB
                </Typography>
              </Link>
            </Grid>

            <SearchBar />
            {mobileMenu()}
            {isAuth ? (
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Link href="/createblog">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2, mr: 2 }}
                  >
                    Create Blog
                  </Button>
                </Link>
                <Button variant="outlined" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </Grid>
            ) : (
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Link href="/register">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2, mr: 2 }}
                  >
                    Create account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outlined" color="secondary">
                    Login
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
