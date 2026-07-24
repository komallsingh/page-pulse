import {Response} from "express";

export const successRes=(
    res: Response,
    data: any,
    message: string,
    statusCode: number=200
)=>{
    res.status(statusCode).json({
        status: "success",
        message,
        data
    });
}

export const errorRes=(
    res: Response,
    message: string,
    statusCode: number=500
)=>{
    res.status(statusCode).json({
        status: "error",
        message
    });
}
