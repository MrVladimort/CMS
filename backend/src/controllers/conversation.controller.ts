import {NextFunction, Request, Response} from "express";
import ConversationModel, {Conversation} from "../models/conversation.model";
import UserModel, {User} from "../models/user.model";

export async function getAllUserConversations(req: Request, res: Response, next: NextFunction) {
    const conversations = ConversationModel.findAllByUser(req.user);
    res.json({conversations, success: true, status: 200});
}

export async function createConversation(req: Request, res: Response, next: NextFunction) {
    const {userIds} = req.body;
    const users = await UserModel.findAllByIdIn(userIds);
    const conversation = new ConversationModel({users});
    await conversation.save();
    res.json({conversation, success: true, status: 200});
}

export async function deleteConversation(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    await ConversationModel.findOneAndDelete({postId});
    res.json({success: true, status: 200});
}
