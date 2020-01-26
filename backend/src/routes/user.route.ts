import Router from "express-promise-router";
import {getAnotherUser, getUser, setSteamId} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getUser);
router.get("/:id", getAnotherUser);
router.put("/steam", authMiddleware, setSteamId);

export  default  router;
