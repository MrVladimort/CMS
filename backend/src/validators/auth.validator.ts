import {body} from "express-validator/check";

export const authValidator = [
    body("email")
        .exists()
        .isEmail()
        .isLength({min: 5, max: 50}),
    body("pass")
        .exists(),
];
