import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { useRouter } from "next/router";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AuthModal = () => {
  const { open, setOpen, handleOpen, handleClose } = useUserAuth();
  const router = useRouter();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Oops! login to continue
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={() => router.push("/register")}
            >
              Create an account
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AuthModal;
