import mongoose from "mongoose";

// @ts-ignore
import autopopulate from "mongoose-autopopulate";
// @ts-ignore
import mongoose_sequence from "mongoose-sequence";
import serverConfig from "../configs/server.config";
import {winstonLogger} from "../services/logger.service";

export const AutoIncrement = mongoose_sequence(mongoose);
export const AutoPopulate = autopopulate;
export async function connectToDb() {
    mongoose.set("debug", true);
    await mongoose.connect(serverConfig.dbURI, serverConfig.dbOptions);
    winstonLogger.info(`Database connected on ${serverConfig.dbURI}`);
}
