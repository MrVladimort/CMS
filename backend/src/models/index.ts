import mongoose from "mongoose";

// @ts-ignore
import mongoose_sequence from "mongoose-sequence";
import serverConfig from "../configs/server.config";
import {winstonLogger} from "../services/logger.service";

export const AutoIncrement = mongoose_sequence(mongoose);
export async function connectToDb() {
    mongoose.set("debug", true);
    await mongoose.connect(serverConfig.dbURI, serverConfig.dbOptions);
    winstonLogger.info(`Database connected on ${serverConfig.dbURI}`);
}
