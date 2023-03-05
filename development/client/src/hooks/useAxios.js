import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.api.url;

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
