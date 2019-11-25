import {NextFunction, Request, Response} from "express";
import {getConvertedUserData, getFriends, getRecentlyPlayedGames, getSteamID64} from "../services/steam.service";

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    userId = await getSteamID64(userId);

    const userData = await getConvertedUserData(userId);
    const friends = await getFriends(userId);

    res.json({user: userData, userFriends: friends});
}

export async function getLastPlayedGames(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    userId = await getSteamID64(userId);
    const games = await getRecentlyPlayedGames(userId);
    res.json(games);
}
