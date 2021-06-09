"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = express_1.Router();
router.route('/listUser').post(usuarioController_1.listUsuarios);
router.route('/createUser').post(usuarioController_1.createUsuario);
router.route('/updateUser').post(usuarioController_1.updateUsuario);
exports.default = router;
