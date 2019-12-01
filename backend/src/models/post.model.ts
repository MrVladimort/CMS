import {DocumentType, getModelForClass, modelOptions, plugin, prop, Ref} from "@typegoose/typegoose";
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
    @prop({unique: true}) public postId: number;
    @prop({required: true}) public text: string;
    @prop({}) public imageLink: string;
    @prop({required: true, unique: true}) public title: string;
    @prop({autopopulate: true, required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, default: 0}) public views: number;
}

export default getModelForClass(Post);
