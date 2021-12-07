import axios from "axios";

const axiosInstance = (history = null) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });
  axiosInstance.CancelToken = axios.CancelToken;
  axiosInstance.isCancel = axios.isCancel;
  axiosInstance.interceptors.response.use(
    (response) => {
      return new Promise((resolve, reject) => {
        resolve(response);
      });
    },
    (error) => {
      if (error.response.status === 403) {
        if (history) {
          history.push("/");
        }
      }
      console.log(error.response);
      return new Promise((resolve, reject) => {
        reject(error.response);
      });
    }
  );

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );
  return axiosInstance;
};

export default axiosInstance;
