import { Router } from "express";
import * as servicio from '../controllers/servicioController';

const router = Router();

router.route('/listServicio').post(servicio.listar);
router.route('/createServicio').post(servicio.registrar);
router.route('/updateServicio').post(servicio.actualizar);
router.route('/deleteServicio').post(servicio.eliminar);


export default router;