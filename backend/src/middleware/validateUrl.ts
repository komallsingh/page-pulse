import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const validateUrl = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { url } = req.body;

    if (!url) {
        throw new AppError("URL is required.", 400);
    }

    try {

        const parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new AppError(
                "Only HTTP and HTTPS URLs are allowed.",
                400
            );
        }

    } catch {

        throw new AppError(
            "Please enter a valid URL.",
            400
        );

    }

    next();

};