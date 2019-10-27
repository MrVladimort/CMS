import {blue, magenta, red} from "colors/safe";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import HttpError from "../errors/http.error";
import { winstonLogger } from "../services/logger.service";

export async function notFound( req: Request, res: Response, next: NextFunction ) {
    next(new HttpError(404, "Page not found"));
}

export async function errorHandler( err: HttpError, req: Request, res: Response, next: NextFunction ) {
    let errorMsg: string = [
        magenta(`${req.method}`),
        blue(`${req.originalUrl}`),
        red(`Status code: ${err.status || 500} - Error: ${err.message}`),
    ].join(" ");

    if (req.query && _.keys(req.query).length > 0) {
        errorMsg += ` | query: ${JSON.stringify(req.query)}`;
    }
    if (req.body && _.keys(req.body).length > 0) {
        errorMsg += ` | body: ${JSON.stringify(req.body)}`;
    }

    winstonLogger.error(errorMsg);
    res.status(err.status || 500)
        .json({ error: err.message || err, status: err.status || 500 });
}
