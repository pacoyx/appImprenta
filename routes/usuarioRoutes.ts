import { Router, Request, Response } from "express";
import {createUsuario, listUsuarios, updateUsuario} from '../controllers/usuarioController';

const router = Router();

router.route('/listUser').post(listUsuarios);
router.route('/createUser').post(createUsuario);
router.route('/updateUser').post(updateUsuario);


export default router;