import {instanceMethod, InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "postId"})
export class Post extends Typegoose {
    @prop({unique: true}) public postId: number;
    @prop({required: true}) public text: string;
    @prop({}) public imageLink: string;
    @prop({required: true, unique: true}) public title: string;
    @prop({required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, default: 0}) public views: number;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Post>, ret: InstanceType<Post>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Post().getModelForClass(Post, Options);
