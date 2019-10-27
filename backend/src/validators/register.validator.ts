import {body} from "express-validator/check";

export const registerValidator = [
    body("name")
        .exists()
        .isLength({min: 3, max: 40}),
    body("surname")
        .exists()
        .isLength({min: 3, max: 40}),
    body("email")
        .exists()
        .isEmail()
        .isLength({min: 5, max: 50}),
    body("pass")
        .exists()
        .custom((value, {req}) => !value.includes(req.body.email)),
    body("repeatPass")
        .exists()
        .custom((value, {req}) => value === req.body.pass),
];
