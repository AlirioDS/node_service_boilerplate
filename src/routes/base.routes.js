import { Router } from "express";
import { root } from "../controllers/baseController"

const router = Router();

router.get("/", root)

export default router;
