import { Avatar, Box, Divider, Typography } from "@mui/material";
import toDateTime from "../helpers/dateFormater";
import ContentPaper from "./ContentPaper";
import { blue } from "@mui/material/colors";

const UserProfile = ({ username, joinDate }) => {
  return (
    <ContentPaper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
        }}
      >
        <Avatar
          sx={{
            width: "50px",
            height: "50px",
            bgcolor: blue[500],
          }}
          alt="An image of the author"
        >
          {username.charAt(0)}
        </Avatar>
        <Typography component="h1" variant="h5">
          {username}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
        <Typography variant="body1">
          <strong>Joined</strong> <br /> {toDateTime(joinDate)}
        </Typography>
      </Box>
    </ContentPaper>
  );
};

export default UserProfile;
