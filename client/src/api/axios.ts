/**
 * Axios instance for making requests to the server API
 * @description This file exports an Axios instance that is used to make requests to the server API.
 * The base URL is set to the server URL, and the Authorization header is set to the token if it exists.
 * The token is saved to local storage when the user logs in, and is removed when the user logs out.
 * *!IMPORTANT: This is not secure, and it is recommended to use HTTP-Only Cookies to store the token instead.
 */
import axios from "axios";

const baseURL = `${import.meta.env.VITE_SERVER_URL}/api`;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});