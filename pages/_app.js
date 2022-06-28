import Layout from "../components/Layout";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserAuthContextProvider } from "../context/UserAuthContext";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#000000",
        dark: "#ffffff",
      },
      secondary: {
        main: "#3d48df",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <UserAuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
