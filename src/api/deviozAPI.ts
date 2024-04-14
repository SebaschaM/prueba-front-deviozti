import axios from "axios";

// El nombre del archivo puede cambiar
export const deviozAPI = axios.create({
   baseURL: "http://localhost:3000",
  //baseURL: "https://deviozpagebackend-production.up.railway.app",
  // baseURL: "https://lobster-app-l2ihs.ondigitalocean.app",
  // timeout: 2000,
});

// interceptors send headers bearer token
// deviozAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
