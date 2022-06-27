import ContentPaper from "../components/ContentPaper";
import React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { Endpoints } from "../Constants/endpoints";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      userId: uuid(),
    };

    setLoading(true);
    const url = Endpoints.register;
    axios
      .post(url, payload)
      .then((response) => {
        setLoading(false);
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  };
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
            Create an account
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
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
              Create{" "}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </ContentPaper>
  );
};

export default Register;
