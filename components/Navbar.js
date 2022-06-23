import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import Link from "next/link";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Link href="/">
            <Typography variant="h6" noWrap component="div">
              Not a blog
            </Typography>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
