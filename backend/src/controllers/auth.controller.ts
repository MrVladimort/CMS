import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import UserModel from "../models/user.model";

const refreshTokens: Set<string> = new Set();

export async function withEmailAndPass(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(432, "Not valid data");
    }

    const {email, pass} = req.body;
    const user = await UserModel.findOneByEmail(email);

    if (user) {
        if (user.verifyPassword(pass)) {
            const tokens = user.generateJWT();

            refreshTokens.add(tokens.refreshToken);

            res.json({user, tokens, success: true, status: 200});
        } else { throw new HttpError(401, "Bad email or password"); }
    } else { throw new HttpError(404, "User not found"); }
}

export async function withEmailAndRefreshToken(req: Request, res: Response, next: NextFunction) {
    const {email, refreshToken} = req.body;

    if (!refreshTokens.delete(refreshToken)) { throw new HttpError(401, "Bad email or token"); }

    const user = await UserModel.findOneByEmail(email);
    if (user) {
        if (user.verifyRefreshToken(refreshToken)) {
            const tokens = user.generateJWT();

            refreshTokens.add(tokens.refreshToken);

            res.json({user, tokens, success: true, status: 200});
        } else { throw new HttpError(401, "Bad email or token"); }
    } else { throw new HttpError(404, "User not found"); }
}

export async function withAccessToken(req: Request, res: Response, next: NextFunction) {
    const {accessToken} = req.body;

    const token = accessToken.replace("Bearer ", ""); // jwt = req.header.Authorization
    const user = await UserModel.findOneWithAccessToken(token);

    if (!user) { return next(new HttpError(404, "User not found")); }

    const tokens = user.generateJWT();
    res.json({user, tokens, success: true, status: 200});
}
