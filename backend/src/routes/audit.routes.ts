import { Router } from "express";
import { auditController } from "../controllers/audit.controller";
import { validateUrl } from "../middleware/validateUrl";

const router = Router();

router.post(
    "/",
    validateUrl,
    auditController
);

export default router;