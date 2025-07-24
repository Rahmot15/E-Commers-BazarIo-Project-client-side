import axios from "axios";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = user?.accessToken || localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return instance;
};

export default useAxiosSecure;
