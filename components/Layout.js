import Footer from "./Footer";
import Navbar from "./Navbar";
import { Container } from "@mui/system";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
