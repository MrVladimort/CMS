import {NextFunction, Request, Response} from "express";
import {
    getConvertedUserData,
    getFriends,
    getGamesRecommendations,
    getRecentlyPlayedGames,
    getSteamID64, getUserData,
    getUserOwnedGames,
    getUserRecommendations,
    getUserStats,
} from "../services/steam.service";

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    userId = await getSteamID64(userId);

    const userData = await getConvertedUserData(userId);
    const friends = await getFriends(userId);

    res.json({user: userData, userFriends: friends});
}

export async function checkSteamID(req: Request, res: Response, next: NextFunction) {
    try {
        let userId = req.params.id;
        userId = await getSteamID64(userId);
        res.json({userId});
    } catch (e) {
        res.json(null);
    }
}

export async function authSeam(req: Request, res: Response, next: NextFunction) {
    res.json("TEST");
}

export async function getGamesCategories(req: Request, res: Response, next: NextFunction) {
    res.json([
        {
            key: "CS GO",
            text: "CS GO",
            value: "CS GO",
            image: {avatar: true, src: "https://www.freeiconspng.com/uploads/counter-strike-global-offensive-csgo-icon-8.png"},
        },
        {
            key: "DOTA 2",
            text: "DOTA 2",
            value: "DOTA 2",
            image: {avatar: true, src: "https://p1.hiclipart.com/preview/835/152/984/marei-icon-theme-dota-2-logo.jpg"},
        },
        {
            key: "PUBG",
            text: "PUBG",
            value: "PUBG",
            image: {avatar: true, src: "https://i.pinimg.com/originals/c0/e8/65/c0e86501b0a44a361f7e4b468ff92917.jpg"},
        },
        {
            key: "H1Z1",
            text: "H1Z1",
            value: "H1Z1",
            image: {avatar: true, src: "https://b.thumbs.redditmedia.com/P-1Fp9gDMKcL4ZIFTJaN0O6yobTcv3ldWD2fHls4qPc.png"},
        },
    ]);
}

export async function checkProfileStatus(req: Request, res: Response, next: NextFunction) {
    try {
        let userId = req.params.id;
        userId = await getSteamID64(userId);
        const status = await getUserData(userId);
        res.json({status});
    } catch (e) {
        res.json(null);
    }
}

export async function getLastPlayedGames(req: Request, res: Response, next: NextFunction) {
    let userId = req.params.id;
    userId = await getSteamID64(userId);
    const games = await getRecentlyPlayedGames(userId);
    res.json(games);
}

export async function getGameStats(req: Request, res: Response, next: NextFunction) {
    // stats works only for csgo
    // request ?userId=maxvel_trade&gameId=730
    // tslint:disable-next-line:prefer-const
    let { userId, gameId } = req.query;
    userId = await getSteamID64(userId);
    const gameStats = await getUserStats(userId, gameId);
    res.json(gameStats);
}

export async function getUserGames(req: Request, res: Response, next: NextFunction) {
    try {
        let userId = req.params.id;
        userId = await getSteamID64(userId);
        const games = await getUserOwnedGames(userId);
        res.json(games);
    } catch (error) {
        next(error);
    }
}

export async function getGameRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id;
        const recommendations = await getGamesRecommendations(userId);
        res.json({recommendations, success: true, status: 200});
    } catch (error) {
        next(error);
    }
}

export async function getFriendsRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id;
        const recommendations = await getUserRecommendations(userId);
        res.json({recommendations, success: true, status: 200});
    } catch (error) {
        next(error);
    }
}
