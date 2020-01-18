import Router from "express-promise-router";
import {
    authSeam, checkProfileStatus, checkSteamID, getGamesCategories,
    getGameStats,
    getLastPlayedGames,
    getRecommendations,
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
router.get("/games/recommendations/:id", getRecommendations);
router.get("/games/categories", getGamesCategories);

export default router;
