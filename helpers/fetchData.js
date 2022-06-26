import { Endpoints } from "../Constants/endpoints";

const fetchData = async (url) => {
  const header = {
    Authorization: Endpoints.getToken,
  };

  try {
    const res = await fetch(url, {
      headers: header,
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchData;
