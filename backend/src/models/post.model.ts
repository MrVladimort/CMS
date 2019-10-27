import {instanceMethod, InstanceType, ModelType, plugin, prop, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";

@plugin(AutoIncrement, {inc_field: "postId"})
export class Post extends Typegoose {
    @prop({unique: true}) public postId: number;
    @prop({required: true}) public text: string;
    @prop({required: true, unique: true}) public name: string;
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
