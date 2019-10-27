import {NextFunction, Request, Response} from "express";

export async function getHome(req: Request, res: Response, next: NextFunction) {
    res.json();
}
