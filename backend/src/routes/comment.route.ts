import Router from "express-promise-router";
import {createComment, deleteComment, editComment, getAllComments, getAllCommentsByPostId, getComment, replyComment} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {commentValidator} from "../validators/comment.validator";

const router = Router();

router.get("/post/:id", getAllCommentsByPostId);
router.get("/:id", getComment);
router.get("/", getAllComments);
router.put("/:id", authMiddleware, editComment);
router.put("/reply/:id", authMiddleware, replyComment);
router.post("/", authMiddleware, commentValidator, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
