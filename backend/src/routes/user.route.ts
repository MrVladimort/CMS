import Router from "express-promise-router";
import {getAnotherUser, getUser} from "../controllers/user.controller";

const router = Router();

router.get("/", getUser);
router.get("/:id", getAnotherUser);

export  default  router;
