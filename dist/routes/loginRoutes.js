"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const router = express_1.Router();
router.post('/auth', loginController_1.login);
exports.default = router;
