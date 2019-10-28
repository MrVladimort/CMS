import {InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";
import {Post} from "./post.model";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "commentId"})
export class Comment extends Typegoose {
    @staticMethod
    public static async findAll(this: ModelType<Comment> & typeof Comment) {
        return this.find().populate("User").populate("Post");
    }

    @staticMethod
    public static async findOneByCommentId(this: ModelType<Comment> & typeof Comment, commentId: number) {
        return this.findOne({
            commentId,
        }).populate("User").populate("Post");
    }

    @staticMethod
    public static async findAllByPost(this: ModelType<Comment> & typeof Comment, post: string) {
        return this.find({
            Post: post,
        }).populate("User").populate("Post");
    }

    @staticMethod
    public static async findAllByUser(this: ModelType<Comment> & typeof Comment, user: string) {
        return this.find({
            User: user,
        }).populate("User").populate("Post");
    }

    @prop({unique: true}) public commentId: number;
    @prop({required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, ref: Post}) public Post: Ref<Post>;
    @prop({required: true}) public text: string;
    @prop({required: true}) public grade: number;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Comment>, ret: InstanceType<Comment>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Comment().getModelForClass(Comment, Options);
