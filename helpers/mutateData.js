import axios from "axios";

const mutateData = async (url) => {
  const header = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const res = await axios.delete(url, { headers: header });
    window.location.reload();
    return res.data;
  } catch (error) {
    return error;
  }
};

export default mutateData;
