import axios from "axios";
import AppError from "../utils/AppError";
import { finalReport } from "../utils/audit.interface";

export const auditService = async (
    url: string
): Promise<finalReport> => {

    try {

        const startTime = Date.now();

        const response = await axios.get(url, {
            timeout: 10000
        });

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        return {
            statusCode: response.status,
            responseTime,
            title: "",
            metaDescription: "",
            h1Count: 0,
            imagesWithoutAlt: 0,
            wordCount: 0
        };

    } catch (error: any) {

        if (error.code === "ECONNABORTED") {
            throw new AppError("Request timed out.", 408);
        }

        throw new AppError(
            "Unable to fetch website.",
            500
        );
    }
};