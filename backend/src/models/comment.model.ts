import {arrayProp, DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {CommentReply} from "./commentReply.model";
import {AutoIncrement, AutoPopulate} from "./index";
import {Post} from "./post.model";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "commentId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Comment>, ret: DocumentType<Comment>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class Comment {
    public static async findAll(this: ReturnModelType<typeof Comment>) {
        return this.find();
    }

    public static async findOneByCommentId(this: ReturnModelType<typeof Comment>, commentId: number) {
        return this.findOne({
            commentId,
        });
    }

    public static async findAllByPost(this: ReturnModelType<typeof Comment>, post: Post) {
        return this.find({
            Post: post,
        });
    }

    public static async findAllByUser(this: ReturnModelType<typeof Comment>, user: User) {
        return this.find({
            User: user,
        });
    }

    @prop({unique: true}) public commentId: number;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({autopopulate: true, required: true, ref: Post}) public Post: Ref<Post>;
    @prop({required: true}) public text: string;
    @prop({required: true, min: 1, max: 5}) public grade: number;
    @arrayProp({
        ref: "CommentReply", // please know for "virtual populate" that "itemsRef" will **not** work here
        foreignField: "Comment", // compare this value to the local document populate is called on
        localField: "_id", // compare this to the foreign document's value defined in "foreignField"
    })
    public replies: Array<Ref<CommentReply>>;
}

export default getModelForClass(Comment);
