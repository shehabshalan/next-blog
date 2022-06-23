const fetchData = async (url) => {
  const header = {
    Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
  };

  try {
    const res = await fetch(url, {
      headers: header,
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

export default fetchData;
