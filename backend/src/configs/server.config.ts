export interface IServerConfig {
    serverUrl: string;
    clientUrl: string;
    port: number;
    dbURI: string;
    dbOptions: {
        useNewUrlParser: boolean,
        useCreateIndex: boolean,
    };
    jwt: {
        accessSecret: string,
        refreshSecret: string,
        accessOptions: {
            expiresIn: string,
        },
        refreshOptions: {
            expiresIn: string,
        },
    };
}

const config: IServerConfig = {
    serverUrl: "http://localhost:8080/api",
    clientUrl: "http://localhost:3000",
    port: 8080,
    dbURI: "mongodb://admin:admin123@ds115874.mlab.com:15874/cms_pro",
    dbOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    jwt: {
        accessSecret: "accessSecret",
        refreshSecret: "refreshSecret",
        accessOptions: {
            expiresIn: "1d",
        },
        refreshOptions: {
            expiresIn: "7d",
        },
    },
};

export default config;
