import axios from "axios";

export const api = axios.create({
    baseURL: "https://page-pulse-48v4.onrender.com/",
    headers: {
        "Content-Type": "application/json",
    },
});