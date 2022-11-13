import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const useAxios = (axiosParams, trigger) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.request(axiosParams);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [trigger]);
  return { response, error, isLoading };
};

export default useAxios;
