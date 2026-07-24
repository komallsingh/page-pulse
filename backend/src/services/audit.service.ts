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
            timeout: 10000,
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

    } catch (error: any) {

    console.log("Code:", error.code);
    console.log("Message:", error.message);
    console.log("Status:", error.response?.status);
    console.log("Content-Type:", error.response?.headers?.["content-type"]);

    if (error instanceof AppError) {
        throw error;
    }

    throw new AppError("Unable to fetch website.", 500);
}
};