import axios from "axios";

export const api = axios.create({
    baseURL: "https://page-pulse-48v4.onrender.com/",
    timeout: 6000, // Set a timeout of 6 seconds
    headers: {
        "Content-Type": "application/json",
    },
});