import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auditController } from "./controllers/audit.controller";
import auditRoutes from "./routes/audit.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/audit", auditRoutes);
app.use(errorHandler);
export default app;