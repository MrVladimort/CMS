import UserModel from "../models/user.model";

export const getUserInfo = (userId: number) => UserModel.findOneByID(userId);
