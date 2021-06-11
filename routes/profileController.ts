import { Router } from "express";
import * as profile from '../controllers/profileController';

const router = Router();

router.route('/listarProfiles').post(profile.listar);

export default router;