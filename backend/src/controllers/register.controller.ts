import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import UserModel, {User} from "../models/user.model";
import {sendRegisterConfirmation} from "../services/email.service";
import {winstonLogger} from "../services/logger.service";

export async function register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        winstonLogger.error(errors);
        throw new HttpError(422, "Not valid data");
    }

    const userData: User = req.body;
    const user = new UserModel(userData);
    await user.save();

    const userTokens = user.generateJWT();
    await sendRegisterConfirmation(user.email, userTokens.accessToken);

    res.json({success: true, status: 200});
}

export async function confirmEmail(req: Request, res: Response, next: NextFunction) {
    const token = req.params.token;

    if (!token) {
        throw new HttpError(401, "Bad token provided");
    }

    const user = await UserModel.findOneWithAccessToken(token, false);
    if (user) {
        user.verified = true;
        await user.save();

        const tokens = user.generateJWT();
        res.json({user, tokens, success: true, status: 200});
    } else {
        throw new HttpError(404, "User not found");
    }
}
