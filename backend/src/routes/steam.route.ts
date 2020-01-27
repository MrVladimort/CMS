import Router from "express-promise-router";
import {
    authSeam, checkProfileStatus, checkSteamID, getFriendsRecommendations,
    getGameRecommendations,
    getGamesCategories,
    getGameStats,
    getLastPlayedGames,
    getUserGames,
    getUserInfo,
} from "../controllers/steam.controller";

const router = Router();

router.get("/:id", getUserInfo);
router.get("/auth", authSeam);
router.get("/check/:id", checkSteamID);
router.get("/check/status/:id", checkProfileStatus);
router.get("/games/recently/:id", getLastPlayedGames);
router.get("/games/stats/", getGameStats);
router.get("/games/owned/:id", getUserGames);
router.get("/recommendations/game/:id", getGameRecommendations);
router.get("/recommendations/friends/:id", getFriendsRecommendations);
router.get("/games/categories", getGamesCategories);

export default router;
