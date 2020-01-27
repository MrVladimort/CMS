import {DocumentType} from "@typegoose/typegoose";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {Server} from "http";

import serverConfig from "./configs/server.config";
import {errorHandler, notFound} from "./middlewares/basic.middleware";
import {connectToDb} from "./models";
import {User} from "./models/user.model";
import routes from "./routes";
import {morganLogger, winstonLogger} from "./services/logger.service";
import {initSocket} from "./services/socket.service";

winstonLogger.info(`Process: ${process.cwd()}`);

declare global {
    namespace Express {
        interface Request {
            user: DocumentType<User>;
        }
    }
}

const app = express();

app.use(cors());
app.use(morganLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

app.use(notFound);
app.use(errorHandler);

async function main() {
    const server = new Server(app);
    await connectToDb();
    await server.listen(serverConfig.port);
    winstonLogger.info(`Server ready and listening on port ${serverConfig.port}`);
}

main().catch(winstonLogger.error);

export default app;
