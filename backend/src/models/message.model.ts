import {DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Conversation} from "./conversation.model";
import {AutoIncrement, AutoPopulate} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "messageId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Message>, ret: DocumentType<Message>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class Message {

    public static async findAllByUser(this: ReturnModelType<typeof Message>, user: User) {
        return this.find({
            User: user,
        });
    }

    public static async findAllByConversation(this: ReturnModelType<typeof Message>, conversation: Conversation) {
        return this.find({
            Conversation: conversation,
        });
    }

    @prop({unique: true}) public messageId: number;
    @prop({}) public text: string;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, ref: Conversation}) public Conversation: Ref<Conversation>;
}

export default getModelForClass(Message);
