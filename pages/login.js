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
const login = () => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      identifier: data.get("email"),
      password: data.get("password"),
    };
    console.log(payload);
    const url = Endpoints.login;
    // post request to server
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
    </ContentPaper>
  );
};

export default login;
