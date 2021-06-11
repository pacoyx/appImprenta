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
exports.updateUsuario = exports.createUsuario = exports.listUsuarios = void 0;
const cnxMysql_1 = require("../configdb/cnxMysql");
function listUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield cnxMysql_1.connect();
            const result = yield conn.query('CALL SP_S_TB_USUARIO()');
            res.json({
                estado: 'ok',
                message: 'exitoso',
                data: result[0]
            });
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
exports.listUsuarios = listUsuarios;
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let elbody = req.body;
        if (elbody == null) {
            return res.status(400).json({ estado: 'error', message: 'request invalido' });
        }
        if (elbody.email == null
            || elbody.email === ''
            || elbody.password == null
            || elbody.password === ''
            || elbody.nameUser == null
            || elbody.nameUser === ''
            || elbody.profileUser == null
            || elbody.profileUser === ''
            || elbody.area == null
            || elbody.area === ''
            || elbody.statusUser == null
            || elbody.statusUser === '') {
            return res.status(400).json({ estado: 'error', message: 'request invalido' });
        }
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        console.log([newPost]);
        let parameters = [newPost.email, newPost.password, newPost.nameUser,
            newPost.profileUser, newPost.area, newPost.statusUser];
        try {
            yield conn.query('CALL SP_I_TB_USUARIO(?,?,?,?,?,?)', parameters);
            res.json({
                estado: 'ok',
                message: 'exito'
            });
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
exports.createUsuario = createUsuario;
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        console.log([newPost]);
        let parameters = [newPost.email, newPost.password, newPost.nameUser, newPost.profileUser, newPost.area, newPost.statusUser];
        try {
            yield conn.query('CALL SP_U_TB_USUARIO(?,?,?,?,?,?)', parameters);
            res.json({
                estado: 'ok',
                message: 'exitoso'
            });
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
exports.updateUsuario = updateUsuario;
