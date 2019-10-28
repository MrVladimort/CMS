import crypto from "crypto";
import {instanceMethod, InstanceType, ModelType, plugin, prop, staticMethod, Typegoose} from "typegoose";
import {createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken} from "../services/jwt.service";
import {AutoIncrement} from "./index";

const hashPassWithSalt = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt, 64, 128, "sha512").toString("base64");
const generateSalt = (): string => crypto.randomBytes(8).toString("hex");

export interface IAuthTokens {
    accessToken: string;
    refreshToken?: string;
}

@plugin(AutoIncrement, {inc_field: "userId"})
export class User extends Typegoose {

    @prop()
    set pass(this: InstanceType<User>, pass: string) {
        const user = this;
        user.hashAndSetPass(pass);
    }

    @staticMethod
    public static async findOneByEmail(this: ModelType<User> & typeof User, email: string, verified: boolean = true) {
        return this.findOne({email, verified});
    }

    @staticMethod
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

    @instanceMethod
    public hashAndSetPass(this: InstanceType<User>, pass: string): void {
        const passSalt = generateSalt();
        const passHash = hashPassWithSalt(pass, passSalt);

        this.passSalt = passSalt;
        this.passHash = passHash;
    }

    @instanceMethod
    public verifyPassword(this: InstanceType<User>, passToCheck: string): boolean {
        const passHash = hashPassWithSalt(passToCheck, this.passSalt); // getting hashPass using pass and salt
        return this.passHash === passHash; // found user with same hash and returned it
    }

    @instanceMethod
    public verifyRefreshToken(this: InstanceType<User>, token: string): boolean {
        const email = verifyRefreshToken(token);
        return this.email === email;
    }

    @instanceMethod
    public generateJWT(this: InstanceType<User>): IAuthTokens {
        const accessToken = createAccessToken(this.email);
        const refreshToken = createRefreshToken(this.email);

        return {
            accessToken,
            refreshToken,
        };
    }
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<User>, ret: InstanceType<User>, options: any) => {
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
};

export default new User().getModelForClass(User, Options);
