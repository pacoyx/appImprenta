import { Router, Request, Response } from "express";
import {createUsuario} from '../controllers/loginController';

const router = Router();

router.post('/auth', (req: Request, res: Response) => {

    const cuerpo = req.body;
    // const de = req.body.de;
    // const id = req.params.id;
    res.json({
        ok: true, mensaje: 'todo esta bien', elbody: cuerpo
    });
});


router.route('/newUser').post(createUsuario);




export default router;