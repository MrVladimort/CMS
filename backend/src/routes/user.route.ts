import Router from "express-promise-router";
import {getUser} from "../controllers/user.controller";

const router = Router();

router.get("/", getUser);

export  default  router;
