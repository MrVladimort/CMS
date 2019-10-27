import * as jwt from "jsonwebtoken";
import serverConfig from "../configs/server.config";
import HttpError from "../errors/http.error";

export const createAccessToken = (email: string) => jwt.sign({email}, serverConfig.jwt.accessSecret, serverConfig.jwt.accessOptions);

export const verifyAccessToken = (token: string) => {
    try {
        const verifiedObj: any = jwt.verify(token, serverConfig.jwt.accessSecret);
        return verifiedObj.email;
    } catch {
        throw new HttpError(401, "Bad token data");
    }
};

export const createRefreshToken = (email: string) => jwt.sign({email}, serverConfig.jwt.refreshSecret, serverConfig.jwt.refreshOptions);

export const verifyRefreshToken = (token: string) => {
    try {
        const verifiedObj: any = jwt.verify(token, serverConfig.jwt.refreshSecret);
        return verifiedObj.email;
    } catch {
        throw new HttpError(401, "Bad token data");
    }
};
