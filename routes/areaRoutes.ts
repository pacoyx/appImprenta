import { Router } from "express";
import * as area from '../controllers/areaController';

const router = Router();

router.route('/listAreas').post(area.listAreas);
router.route('/createAreas').post(area.createArea);
router.route('/updateAreas').post(area.updateArea);
router.route('/deleteAreas').post(area.deleteArea);


export default router;