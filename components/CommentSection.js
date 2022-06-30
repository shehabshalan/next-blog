import {
  Avatar,
  Button,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import CommentFeed from "./CommentFeed";

const CommentSection = ({
  comments,
  commentBody,
  handleCommentChange,
  user,
  setOpen,
  handleCommentSubmit,
  commentEmpty,
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Comments ({comments?.length > 0 ? comments.length : 0})
      </Typography>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <CommentFeed key={comment.commentId} comment={comment} />
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <CardHeader
        sx={{ p: 0, mb: 2, mt: 4 }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            fullWidth
            value={commentBody}
            onChange={handleCommentChange}
            disabled={!user}
            onClick={() => {
              if (!user) {
                setOpen(true);
              }
            }}
          />
        }
      />
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCommentSubmit}
          disabled={commentEmpty}
        >
          Comment
        </Button>
      </div>
    </>
  );
};

export default CommentSection;
