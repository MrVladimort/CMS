import {NextFunction, Request, Response} from "express";

export async function getUser(req: Request, res: Response, next: NextFunction) {
    res.json({user: req.user, success: true, status: 200});
}
