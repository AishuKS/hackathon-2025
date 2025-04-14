// src/api/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://104.194.104.93/api", // ✅ friend's IP
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
