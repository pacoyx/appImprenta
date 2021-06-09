"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.post('/auth', (req, res) => {
    const cuerpo = req.body;
    // const de = req.body.de;
    // const id = req.params.id;
    res.json({
        ok: true, mensaje: 'todo esta bien', elbody: cuerpo
    });
});
exports.default = router;
