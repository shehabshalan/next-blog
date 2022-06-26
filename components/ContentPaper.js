import { Paper } from "@mui/material";

const ContentPaper = ({ children }) => {
  return <Paper sx={{ p: 4, mt: 6 }}>{children}</Paper>;
};

export default ContentPaper;
