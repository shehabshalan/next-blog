import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";

/// to do - convert auth buttons to small burger menu and remove all buttons on small screen
/// to do - implement search

import Link from "next/link";
import { useUserAuth } from "../context/UserAuthContext";
import SearchBar from "./Search";
const Navbar = () => {
  const { isAuth, logout } = useUserAuth();
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
            {isAuth ? (
              <Grid item xs={4} md={4} lg={4}>
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
              <Grid item xs={4} md={4} lg={4}>
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
