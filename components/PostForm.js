import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ContentPaper from "./ContentPaper";

const PostForm = () => {
  return (
    <ContentPaper>
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" paragraph>
          New Blog
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          //   onChange={(e) => setPostTitle(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          multiline
          fullWidth
          id="body"
          label="Body"
          name="body"
          rows={4}
          //   onChange={(e) => setPostBody(e.target.value)}
          autoFocus
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Container>
    </ContentPaper>
  );
};

export default PostForm;
