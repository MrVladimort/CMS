export interface IAccessConfig {
    mailer: {
        from: string,
        host: string,
        port: number,
        secure: boolean,
        auth: {
            pass: string,
            user: string,
        },
    };
}

const config: IAccessConfig = {
    mailer: {
        from: '"CMS" <cms@pjwstk.edu.pl>',
        auth: {
            pass: "vhp1234567890",
            user: "vladyslav.hravchenko.tester@gmail.com",
        },
        host: "smtp.googlemail.com", // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
    },
};

export default config;
