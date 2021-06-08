"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const router = express_1.Router();
router.post('/auth', (req, res) => {
    const cuerpo = req.body;
    // const de = req.body.de;
    // const id = req.params.id;
    res.json({
        ok: true, mensaje: 'todo esta bien', elbody: cuerpo
    });
});
router.route('/newUser').post(loginController_1.createUsuario);
exports.default = router;
