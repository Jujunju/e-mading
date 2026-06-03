import { Response } from "express";

export const sendResponse = (res: Response, resObj: {statusCode: number, body: any}) => {
    return res.status(resObj.statusCode).json(resObj.body)
}