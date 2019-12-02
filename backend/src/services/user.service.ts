import UserModel from "../models/user.model";

export const getUserInfo = (userId: number) => UserModel.findOneById(userId);
