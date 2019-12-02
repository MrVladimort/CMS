import {body} from "express-validator/check";

export const commentValidator = [
    body("text")
        .exists(),
    body("grade")
        .isNumeric()
        .exists(),
];
