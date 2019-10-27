import Router from "express-promise-router";
import {createPost, deletePost, editPost, getAllPosts, getPost} from "../controllers/post.controller";

const router = Router();

router.get("/:id", getPost);
router.get("/", getAllPosts);
router.post("/", createPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
