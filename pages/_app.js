import Layout from "../components/Layout";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
