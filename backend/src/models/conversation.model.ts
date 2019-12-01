import {arrayProp, DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {AutoIncrement, AutoPopulate} from "./index";
import {Message} from "./message.model";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "conversationId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Conversation>, ret: DocumentType<Conversation>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class Conversation {

    public static async findOneByTwoUsers(this: ReturnModelType<typeof Conversation>, mainUser: User, secondUser: User) {
        return this.findOne({
            MainUser: mainUser,
            SecondUser: secondUser,
        });
    }

    public static async findAllByMainUser(this: ReturnModelType<typeof Conversation>, user: User) {
        return this.find({
            MainUser: user,
        });
    }

    @prop({unique: true}) public conversationId: number;
    @arrayProp({autopopulate: true, required: true, itemsRef: User}) public users: Array<Ref<User>> = [];
    @arrayProp({
        ref: "Message", // please know for "virtual populate" that "itemsRef" will **not** work here
        foreignField: "Conversation", // compare this value to the local document populate is called on
        localField: "_id", // compare this to the foreign document's value defined in "foreignField"
    })
    public messages: Array<Ref<Message>>;
}

export default getModelForClass(Conversation);
