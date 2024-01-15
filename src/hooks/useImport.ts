import { useState } from "react";
import api from "../http/api";
import { AxiosError } from "axios";

function useImport() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);

  const execute = async (fileToSend: File) => {
    const formData = new FormData();
    const file = fileToSend;

    if (!file) {
      return;
    }
    formData.append("file", fileToSend);

    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      const { data } = await api.post("/import", formData);
      setData(data);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setData(null);
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(false);
  };

  return {
    isLoading,
    isError,
    isSuccess,
    error,
    execute,
    data,
    clear,
  };
}

export default useImport;
