import Router from "express-promise-router";
import {
    authSeam,
    getGameStats,
    getLastPlayedGames,
    getRecommendations,
    getUserGames,
    getUserInfo,
} from "../controllers/steam.controller";

const router = Router();

router.get("/:id", getUserInfo);
router.get("/auth", authSeam);
router.get("/games/recently/:id", getLastPlayedGames);
router.get("/games/stats/", getGameStats);
router.get("/games/owned/:id", getUserGames);
router.get("/games/recommendations/:id", getRecommendations);

export default router;
