import Router from "express-promise-router";
import {getGameStats, getLastPlayedGames, getUserGames, getUserInfo} from "../controllers/steam.controller";

const router = Router();

router.get("/:id", getUserInfo);
router.get("/games/recently/:id", getLastPlayedGames);
router.get("/games/stats/:id", getGameStats);
router.get("/games/owned/:id", getUserGames);

export default router;
