import {blue, bold, cyan, green, magenta, red, yellow} from "colors/safe";
import {Request, Response} from "express";
import figure from "figures";
import moment from "moment";
import morgan, {TokenIndexer} from "morgan";
import {createLogger, format, transports} from "winston";

const {colorize, combine, printf, timestamp, label} = format;
const {Console, File} = transports;

const winstonLogger = createLogger({
    exitOnError: false,
    format: combine(
        colorize(),
        label({label: "CMS Project"}),
        timestamp({format: moment().format()}),
        printf((info) => {
            let levelSign = "";

            switch (info.level) {
                case green("info"):
                    levelSign = green(`${figure.tick}${figure.tick}${figure.tick}`);
                    break;
                case red("error"):
                    levelSign = red(`${figure.cross}${figure.cross}${figure.cross}`);
                    break;
                default:
                    break;
            }

            return [
                cyan(`[${info.label}]`),
                yellow(`[${info.timestamp}]`),
                bold(`${levelSign} ${info.level} ${levelSign}`),
                `${typeof info.message === "object" ? JSON.stringify(info.message) : info.message}`,
            ].join(" | ");
        }),
    ),
    transports: [
        new Console({
            handleExceptions: false,
            level: "debug",
        }),
        new File({
            filename: "server.verbose.log",
            level: "verbose",
        }),
    ],
});

function morganFormatFunction(tokens: TokenIndexer, req: Request, res: Response) {
    const status = Number(tokens.status(req, res));
    let statusString = `Status Code: ${status}`;

    if (status >= 400) {
        statusString = red(statusString);
    } else if (status >= 200 && status < 300) {
        statusString = green(statusString);
    } else {
        statusString = yellow(statusString);
    }

    return [
        bold(magenta(`Method: ${tokens.method(req, res)}`)),
        bold(blue(`Url: ${tokens.url(req, res)}`)),
        bold(`${statusString}`),
        bold(cyan(`Response Time: ${tokens["response-time"](req, res)}ms`)),
        `Protocol: HTTP/${tokens["http-version"](req, res)}`,
        `Content Length: ${tokens.res(req, res, "content-length")} bytes`,
        `Remote Address: ${tokens["remote-addr"](req, res).substring(0, 30)}`,
        `User Agent: ${tokens["user-agent"](req, res)}`,
    ].join(" | ");
}

const morganLogger = morgan(morganFormatFunction, {
    stream: {
        write: (str: string) => winstonLogger.info(str),
    },
    // skip: function (req, res) {
    //     return res.statusCode >= 400
    // }
});

export {
    winstonLogger,
    morganLogger,
};
