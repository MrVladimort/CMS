import {arrayProp, DocumentType, getModelForClass, modelOptions, plugin, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Comment} from "./comment.model";
import {AutoIncrement, AutoPopulate} from "./index";
import {Message} from "./message.model";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "categoryId"})
@plugin(AutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: {
            transform: (doc: DocumentType<Category>, ret: DocumentType<Category>, options: any) => {
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
export class Category {
    public static async findAll(this: ReturnModelType<typeof Category>) {
        return this.find();
    }

    public static async findOneById(this: ReturnModelType<typeof Category>, categoryId: number | string): Promise<DocumentType<Category>> {
        return this.findOne({categoryId});
    }

    @prop({unique: true}) public categoryId: number;
    @prop({unique: true}) public name: string;
    @prop({}) public imageLink: string;

}

export default getModelForClass(Category);
