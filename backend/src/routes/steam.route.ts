import Router from "express-promise-router";
import { getLastPlayedGames, getUserInfo } from "../controllers/steam.controller";

const router = Router();

router.get("/:id", getUserInfo);
router.get("/games/recently/:id", getLastPlayedGames);

export default router;
