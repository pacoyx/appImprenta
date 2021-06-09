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
exports.deleteArea = exports.updateArea = exports.createArea = exports.listAreas = void 0;
const cnxMysql_1 = require("../configdb/cnxMysql");
function listAreas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield cnxMysql_1.connect();
            const result = yield conn.query('CALL SP_S_TB_AREA()');
            res.json({
                estado: 'ok',
                message: 'lista de areas',
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
exports.listAreas = listAreas;
function createArea(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        console.log([newPost]);
        let parameters = [newPost.idarea, newPost.descripcion, newPost.estado];
        try {
            yield conn.query('CALL SP_I_TB_AREA(?,?,?)', parameters);
            res.json({
                estado: 'ok',
                message: 'Area Creada'
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
exports.createArea = createArea;
function updateArea(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        console.log([newPost]);
        let parameters = [newPost.idarea, newPost.descripcion, newPost.estado];
        try {
            yield conn.query('CALL SP_U_TB_AREA(?,?,?)', parameters);
            res.json({
                estado: 'ok',
                message: 'Area Actualizada'
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
exports.updateArea = updateArea;
function deleteArea(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        console.log([newPost]);
        let parameters = [newPost.idarea];
        try {
            yield conn.query('CALL SP_D_TB_AREA(?)', parameters);
            res.json({
                estado: 'ok',
                message: 'Area eliminada'
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
exports.deleteArea = deleteArea;
