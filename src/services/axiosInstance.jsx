import axios from "axios";
import Cookies from "js-cookie"; // Make sure you install this if not yet

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    'Accept': "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("csrftoken"); // Assuming your CSRF token is stored in cookies
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken; // Send the CSRF token with each request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
