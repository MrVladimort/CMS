import Router from "express-promise-router";
import {createConversation, deleteConversation, getAllUserConversations} from "../controllers/conversation.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getAllUserConversations);
router.post("/:id", authMiddleware, createConversation);
router.delete("/:id", authMiddleware, deleteConversation);

export default router;
