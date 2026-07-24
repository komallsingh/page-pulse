import axios from "axios";

export const api = axios.create({
    baseURL: "https://page-pulse-1-wm0f.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});