import axios from "axios";
// import useAuth from "./useAuth";
import toast from "react-hot-toast";

export const axiosSecure = axios.create({
  baseURL: "https://daily-expendure-server.vercel.app",
});

const useAxiosSecure = (user) => {
    // const { user } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (user) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
        //   navigate("/");
          toast.error("You cannot access this route");
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
