import Router from "express-promise-router";
import {createPost, deletePost, editPost, getAllPosts, getPost, getUserPosts, searchPost} from "../controllers/post.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", getPost);
router.get("/", getAllPosts);
router.get("/user/:id", getUserPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
