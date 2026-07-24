import axios from "axios";
import AppError from "../utils/AppError";
import { finalReport } from "../utils/audit.interface";
import {extractData} from "../utils/dataExtract"


export const auditService = async (
    url: string
): Promise<finalReport> => {
    try {
        const startTime = Date.now();
        const response = await axios.get(url, {
            timeout: 5000,
            validateStatus:()=> true
        });
        console.log("Status:", response.status);
        console.log("Content-Type:", response.headers["content-type"]);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const contentType=response.headers["content-type"] as string;
        if (!contentType?.includes("text/html")) {
            throw new AppError(
                "Please add a valid html page.",
                415
            );
        }

        const extracted=extractData(response.data);
        return {
            statusCode: response.status,
            responseTime,
            title: extracted.title,
            metaDescription: extracted.metaDescription,
            h1Count: extracted.h1Count,
            imagesWithoutAlt: extracted.imagesWithoutAlt,
            wordCount: extracted.wordCount
        };

    } catch (error: unknown) {

    if (error instanceof AppError) {
        throw error;
    }
    const errorCode = (error as { code?: string; cause?: { code?: string } }).code || (error as { cause?: { code?: string } }).cause?.code;
    const errorMessage = (error as { message?: string }).message?.toLowerCase() || "";
    if (
            errorCode === "ECONNABORTED" || 
            errorCode === "ETIMEDOUT" || 
            errorMessage.includes("timeout")
        ) {
            throw new AppError("Request timed out.", 408);
        }

    if (
        errorCode === "ENOTFOUND" ||
        errorCode === "EAI_AGAIN" ||
        errorCode === "ECONNREFUSED"||
        errorCode === "ERR_NAME_NOT_RESOLVED"
    ) {
        throw new AppError("Address not found.", 404);
    }

    throw new AppError(
        "Unable to fetch website.",
        500
    );
}
};