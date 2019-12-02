import {NextFunction, Request, Response} from "express";
import HttpError from "../errors/http.error";
import FriendModel, {Friend} from "../models/friend.model";
import UserModel, {User} from "../models/user.model";

export async function getFriends(req: Request, res: Response, next: NextFunction) {
    const friends = await FriendModel.findAllByUser(req.user);
    res.json({friends, success: true, status: 200});
}

export async function getFriendRequests(req: Request, res: Response, next: NextFunction) {
    const friends = await FriendModel.findAllByFriend(req.user, false);
    res.json({friends, success: true, status: 200});
}

export async function addFriend(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await UserModel.findOne({userId});
    if (user != null) {
        const friend = new FriendModel({User: req.user, Friend: user});
        await friend.save();
        res.json({friend, success: true, status: 200});
    } else {
        throw new HttpError(404, "User not found");
    }
}

export async function acceptFriend(req: Request, res: Response, next: NextFunction) {
    const friendId = req.params.id;
    const friend = await FriendModel.findOne({friendId});

    if (friend != null) {
        friend.accepted = true;
        await friend.save();
        const newFriend = new FriendModel({User: friend.Friend, Friend: friend.User, accepted: true});
        await newFriend.save();
        res.json({friend, success: true, status: 200});
    } else { throw new HttpError(404, "Friend request not found"); }
}

export async function deleteFriend(req: Request, res: Response, next: NextFunction) {
    const friendId = req.params.id;
    const friend = await FriendModel.findOne({friendId});
    await FriendModel.findOneAndDelete({Friend: friend.User, User: friend.Friend});
    await FriendModel.deleteOne(friend);
    res.json({success: true, status: 200});
}
