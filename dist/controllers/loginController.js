"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const cnxMysql_1 = require("../configdb/cnxMysql");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let elbody = req.body;
        if (elbody == null) {
            return res.status(400).json({ estado: 'error', message: 'request invalido' });
        }
        if (elbody.email == null
            || elbody.email === ''
            || elbody.password == null
            || elbody.password === '') {
            return res.status(400).json({ estado: 'error', message: 'request invalido' });
        }
        const newPost = req.body;
        let parameters = [newPost.email, newPost.password];
        try {
            const conn = yield cnxMysql_1.connect();
            const result = yield conn.query('CALL SP_S_LOGIN(?,?)', parameters);
            console.log('result[0]', result[0][0]);
            if (Object.keys(result[0][0]).length > 0) {
                res.json({
                    estado: 'ok',
                    message: 'login successful',
                    data: result[0]
                });
            }
            else {
                res.json({
                    estado: 'error',
                    message: 'email o password equivocado',
                    data: []
                });
            }
        }
        catch (error) {
            res.json({
                estado: 'error',
                message: 'Ocurrio un problema',
                error
            });
        }
    });
}
exports.login = login;
