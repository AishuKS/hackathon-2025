// src/api/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.198/api", // ✅ friend's IP
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
