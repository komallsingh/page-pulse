import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(error); //log

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: error.message || "Internal Server Error"
    });

};