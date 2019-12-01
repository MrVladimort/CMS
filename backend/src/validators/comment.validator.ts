import {body} from "express-validator/check";

export const commentValidator = [
    body("postId")
        .exists()
        .isNumeric(),
    body("commentData")
        .exists()
        .custom((value: any) => {
            return value.text && value.grade && !isNaN(value.grade);
        }),
];
