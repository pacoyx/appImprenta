import { Router } from "express";
import * as version from '../controllers/versionController';

const router = Router();


router.route('/registrarVersion').post(version.uploadFile);
router.route('/listarVersionServicio').post(version.listarxServicio);
router.route('/listarVersiones').post(version.listarTodos);


export default router;