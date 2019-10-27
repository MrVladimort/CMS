import Router from "express-promise-router";
import {withAccessToken, withEmailAndPass, withEmailAndRefreshToken} from "../controllers/auth.controller";
import {authValidator} from "../validators/auth.validator";

const router = Router();

router.post("/email", authValidator, withEmailAndPass);
router.post("/refresh-token", withEmailAndRefreshToken);
router.post("/token", withAccessToken);

export default router;
