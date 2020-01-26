import Router from "express-promise-router";
import {getAnotherUser, getUser, setSteamId} from "../controllers/user.controller";

const router = Router();

router.get("/", getUser);
router.get("/:id", getAnotherUser);
router.put("/steam", setSteamId);

export  default  router;
