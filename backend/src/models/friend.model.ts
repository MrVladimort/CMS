import {DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {AutoIncrement, AutoPopulate} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "friendId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Friend>, ret: DocumentType<Friend>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class Friend {

    public static async findAllByUser(this: ReturnModelType<typeof Friend>, user: User) {
        return this.find({
            User: user,
        });
    }

    @prop({unique: true}) public friendId: number;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({autopopulate: true, required: true, ref: User}) public Friend: Ref<User>;
}

export default getModelForClass(Friend);
