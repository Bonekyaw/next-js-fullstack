import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use()
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Call Refresh Token API
      // Call previous API again
      console.log("API failed : ", error.response?.status);
    }
    return Promise.reject(error);
  },
);

export default api;
