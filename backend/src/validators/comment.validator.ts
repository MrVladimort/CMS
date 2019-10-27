import {body} from "express-validator/check";

export const commentValidator = [
    body("eventId")
        .exists()
        .isNumeric(),
    body("commentData")
        .exists()
        .custom((value: any) => {
            return value.text && value.grade && !isNaN(value.grade);
        }),
];
