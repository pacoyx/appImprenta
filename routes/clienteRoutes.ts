import { Router } from "express";
import * as cliente from '../controllers/clienteController';

const router = Router();

router.route('/listClientes').post(cliente.listar);
router.route('/createClientes').post(cliente.registrar);
router.route('/updateClientes').post(cliente.actualizar);
router.route('/deleteClientes').post(cliente.eliminar);


export default router;