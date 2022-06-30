import { useEffect } from "react";

// custom hook to use the endpoint for api requests in the app
export const useEndpoint = (endpoint, method, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const res = await fetch(endpoint, {
          method,
          headers: header,
          body,
        });
        const { data } = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [endpoint, method, body]);

  return { data, error };
};
