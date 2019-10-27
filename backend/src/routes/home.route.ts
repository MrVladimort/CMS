import Router from "express-promise-router";
import {getHome} from "../controllers/home.controller";

const router = Router();

router.get("/", getHome);

export default router;
