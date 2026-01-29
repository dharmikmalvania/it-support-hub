import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */
axiosInstance.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

/* ===========================
   RESPONSE INTERCEPTOR
   ❌ NO AUTO LOGOUT
=========================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ DO NOT remove userInfo here
    // ✅ DO NOT redirect automatically

    if (error.response?.status === 401) {
      console.warn("Unauthorized – session may be expired");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
