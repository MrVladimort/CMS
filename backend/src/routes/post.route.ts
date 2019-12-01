import Router from "express-promise-router";
import {createPost, deletePost, editPost, getAllPosts, getPost} from "../controllers/post.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", getPost);
router.get("/", getAllPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
