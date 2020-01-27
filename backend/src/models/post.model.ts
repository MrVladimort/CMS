import {arrayProp, DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Category} from "./category.model";
import CommentModel, {Comment} from "./comment.model";
import {AutoIncrement, AutoPopulate} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "postId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Post>, ret: DocumentType<Post>, options: any) => {
                delete ret._id;
                delete ret.id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
})
export class Post {
    public static async findAll(this: ReturnModelType<typeof Post>) {
        return this.find();
    }

    public static async findAllByUser(this: ReturnModelType<typeof Post>, user: User) {
        return this.find({User: user});
    }

    public static searchByTitle(this: ReturnModelType<typeof Post>, title: string) {
        return this.find({title: {$regex: ".*" + title + ".*", $options: "i"}}).limit(5);
    }

    @prop({unique: true}) public postId: number;
    @prop({required: true}) public text: string;
    @prop({}) public imageLink: string;
    @prop({required: true, unique: true, trim: true}) public title: string;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({autopopulate: true, required: true, ref: Category}) public Category: Ref<Category>;
    @prop({required: true, default: 0}) public views: number;
    @arrayProp({
        ref: Comment, // please know for "virtual populate" that "itemsRef" will **not** work here
        foreignField: "Post", // compare this value to the local document populate is called on
        localField: "_id", // compare this to the foreign document's value defined in "foreignField"
    })
    public comments: Array<Ref<Comment>>;
}

export default getModelForClass(Post);
