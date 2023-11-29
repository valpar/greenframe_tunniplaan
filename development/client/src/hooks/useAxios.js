import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const useAxios = (axiosParams, trigger) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setError(undefined);
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
