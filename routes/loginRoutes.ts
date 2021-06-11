import { Router, Request, Response } from "express";
import { login } from "../controllers/loginController";

const router = Router();

router.post('/auth', login);


export default router;