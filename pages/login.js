import ContentPaper from "../components/ContentPaper";
import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { Endpoints } from "../Constants/endpoints";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      identifier: data.get("email"),
      password: data.get("password"),
    };

    setLoading(true);
    const url = Endpoints.login;
    axios
      .post(url, payload)
      .then((response) => {
        setLoading(false);
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("userId", response.data.user.userId);
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  };

  // login(data.get("email"), data.get("password"));
  return (
    <ContentPaper>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
        }}
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login{" "}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </ContentPaper>
  );
};

export default Login;
