import Router from "express-promise-router";
import {searchPost} from "../controllers/search.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/post", searchPost);

export default router;
