import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auditController } from "./controllers/audit.controller";
import auditRoutes from "./routes/audit.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();


app.use(cors({
    origin: [
        'https://page-pulse-cue0j51vj-singhkomal11711-7963s-projects.vercel.app', 
        'http://localhost:5173' // just in case you test locally
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/audit", auditRoutes);
app.use(errorHandler);
export default app;