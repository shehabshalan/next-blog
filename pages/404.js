import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Page not found</Typography>
      <br />
      <br />
      <Typography variant="body2">
        Taking you back in 3 seconds or click in the button below to go back
      </Typography>
      <br />
      <Button variant="outlined" onClick={() => history.push("/")}>
        Go back
      </Button>
    </Box>
  );
};

export default NotFound;
