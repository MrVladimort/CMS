import {NextFunction, Request, Response} from "express";
import {getUserInfo} from "../services/user.service";

export async function getUser(req: Request, res: Response, next: NextFunction) {
    res.json({user: req.user, success: true, status: 200});
}

export async function getAnotherUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.id);
    const anotherUser = await getUserInfo(userId);
    res.json({user: anotherUser, success: true, status: 200});
}

export async function setSteamId(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    user.steamId = req.body.steamId;
    await user.save();
    res.json({success: true, status: 200});
}
