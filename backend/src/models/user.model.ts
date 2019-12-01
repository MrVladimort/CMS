import {DocumentType, getModelForClass, modelOptions, plugin, prop} from "@typegoose/typegoose";
import {ModelType} from "@typegoose/typegoose/lib/types";
import crypto from "crypto";
import {createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken} from "../services/jwt.service";
import {AutoIncrement} from "./index";

const hashPassWithSalt = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt, 64, 128, "sha512").toString("base64");
const generateSalt = (): string => crypto.randomBytes(8).toString("hex");

export interface IAuthTokens {
    accessToken: string;
    refreshToken?: string;
}

@plugin(AutoIncrement, {inc_field: "userId"})
@modelOptions({schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<User>, ret: DocumentType<User>, options: any) => {
                delete ret._id;
                delete ret.id;
                delete ret.passHash;
                delete ret.passSalt;
                delete ret.verified;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class User {

    set pass(this: DocumentType<User>, pass: string) {
        const user = this;
        user.hashAndSetPass(pass);
    }

    public static async findOneByEmail(this: ModelType<User> & typeof User, email: string, verified: boolean = true) {
        return this.findOne({email, verified});
    }

    public static async findOneWithAccessToken(this: ModelType<User> & typeof User, token: string, verified: boolean = true) {
        const email = verifyAccessToken(token);
        return this.findOneByEmail(email, verified);
    }

    @prop({unique: true}) public userId: number;
    @prop({required: true}) public name: string;
    @prop({required: true}) public surname: string;
    @prop({required: true, unique: true}) public email: string;
    @prop() public passHash: string;
    @prop() public passSalt: string;
    @prop({default: 1}) public userType: number;
    @prop({default: false}) public verified: boolean;

    public hashAndSetPass(this: DocumentType<User>, pass: string): void {
        const passSalt = generateSalt();
        const passHash = hashPassWithSalt(pass, passSalt);

        this.passSalt = passSalt;
        this.passHash = passHash;
    }

    public verifyPassword(this: DocumentType<User>, passToCheck: string): boolean {
        const passHash = hashPassWithSalt(passToCheck, this.passSalt); // getting hashPass using pass and salt
        return this.passHash === passHash; // found user with same hash and returned it
    }

    public verifyRefreshToken(this: DocumentType<User>, token: string): boolean {
        const email = verifyRefreshToken(token);
        return this.email === email;
    }

    public generateJWT(this: DocumentType<User>): IAuthTokens {
        const accessToken = createAccessToken(this.email);
        const refreshToken = createRefreshToken(this.email);

        return {
            accessToken,
            refreshToken,
        };
    }
}

export default getModelForClass(User);
