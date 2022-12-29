import React, { useState, createContext, useContext, useRef, useEffect, useMemo } from "react";
import axios from "axios";

export const AxiosContext = createContext(null);

export const AxiosInstanceProvider = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}) => {
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(
        interceptor
      );
    });
    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(
        interceptor
      );
    });
  }, []);

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          signal: controllerRef.current.signal,
          data: payload,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};


export default useAxios;