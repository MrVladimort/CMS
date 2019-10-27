import Router from "express-promise-router";
import {confirmEmail, register} from "../controllers/register.controller";
import {registerValidator} from "../validators/register.validator";

const router = Router();

router.post("/", registerValidator, register);
router.get("/confirm-email/:token", confirmEmail);

export  default  router;
