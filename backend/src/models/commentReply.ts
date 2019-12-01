import {DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Comment} from "./comment.model";
import {AutoIncrement, AutoPopulate} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "commentReplyId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<CommentReply>, ret: DocumentType<CommentReply>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class CommentReply {
    public static async findAll(this: ReturnModelType<typeof CommentReply>) {
        return this.find();
    }

    public static async findAllByComment(this: ReturnModelType<typeof CommentReply>, comment: Comment) {
        return this.findOne({
            Comment: comment,
        });
    }

    @prop({unique: true}) public commentReplyId: number;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, ref: Comment}) public Comment: Ref<Comment>;
    @prop({required: true}) public text: string;
}

export default getModelForClass(CommentReply);
