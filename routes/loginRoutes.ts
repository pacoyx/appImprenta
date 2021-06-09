import { Router, Request, Response } from "express";

const router = Router();

router.post('/auth', (req: Request, res: Response) => {

    const cuerpo = req.body;
    // const de = req.body.de;
    // const id = req.params.id;
    res.json({
        ok: true, mensaje: 'todo esta bien', elbody: cuerpo
    });
});







export default router;