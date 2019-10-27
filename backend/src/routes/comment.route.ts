import Router from "express-promise-router";
import {createComment, deleteComment, editComment, getAllComments, getAllCommentsByPostId, getComment} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {commentValidator} from "../validators/comment.validator";

const router = Router();

router.get("/event/:id", getAllCommentsByPostId);
router.get("/:id", getComment);
router.get("/", getAllComments);
router.put("/:id", editComment);
router.post("/", authMiddleware, commentValidator, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
