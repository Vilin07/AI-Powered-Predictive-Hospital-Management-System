import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-powered-predictive-hospital-6n7v.onrender.com/api",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;