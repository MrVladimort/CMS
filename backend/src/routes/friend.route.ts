import Router from "express-promise-router";
import {acceptFriend, addFriend, deleteFriend, getFriendRequests, getFriends} from "../controllers/friend.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getFriends);
router.get("/requests", authMiddleware, getFriendRequests);
router.post("/:id", authMiddleware, addFriend);
router.put("/:id", authMiddleware, acceptFriend);
router.delete("/:id", authMiddleware, deleteFriend);

export default router;
