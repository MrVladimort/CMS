import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import CategoryModel from "../models/category.model";

export async function getCategories(req: Request, res: Response, next: NextFunction) {
    const categories = await CategoryModel.findAll();
    res.json({categories, success: true, status: 200});
}
