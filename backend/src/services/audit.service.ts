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