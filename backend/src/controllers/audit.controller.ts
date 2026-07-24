import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { auditService } from "../services/audit.service";
import { successRes } from "../utils/response";

export const auditController = asyncHandler(
    async (req: Request, res: Response) => {

        const { url } = req.body;

        const report = await auditService(url);
        
        return successRes(
            res,
            report,
            "Website audited successfully"
        );
    }
);