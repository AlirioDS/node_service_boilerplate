import { Router } from "express";
import * as authctrl from "../../controllers/v1/authController";

const router = Router();

//Auth
router.post("/login", authctrl.login)

export default router;
