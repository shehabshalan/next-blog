import { TimeToLeave } from "@mui/icons-material";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

const PageHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default PageHead;
