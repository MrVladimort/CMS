import Router from "express-promise-router";
import {getCategories} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);

export default router;
