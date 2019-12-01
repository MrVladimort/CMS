import {DocumentType, getModelForClass, modelOptions, plugin, prop, Ref} from "@typegoose/typegoose";
import {ModelType} from "@typegoose/typegoose/lib/types";
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
    public static async findAll(this: ModelType<Comment> & typeof Comment) {
        return this.find();
    }

    public static async findOneByCommentId(this: ModelType<Comment> & typeof Comment, commentId: number) {
        return this.findOne({
            commentId,
        });
    }

    public static async findAllByPost(this: ModelType<Comment> & typeof Comment, post: Post) {
        return this.find({
            Post: post,
        });
    }

    public static async findAllByUser(this: ModelType<Comment> & typeof Comment, user: User) {
        return this.find({
            User: user,
        });
    }

    @prop({unique: true}) public commentId: number;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({autopopulate: true, required: true, ref: Post}) public Post: Ref<Post>;
    @prop({required: true}) public text: string;
    @prop({required: true}) public grade: number;
}

export default getModelForClass(Comment);
