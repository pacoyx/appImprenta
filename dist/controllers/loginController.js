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
exports.updatePost = exports.deletePost = exports.getPost = exports.createUsuario = exports.getUsuarios = void 0;
// DB
const cnxMysql_1 = require("../configdb/cnxMysql");
function getUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield cnxMysql_1.connect();
            const posts = yield conn.query('SELECT * FROM usuario');
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getUsuarios = getUsuarios;
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield cnxMysql_1.connect();
        yield conn.query('INSERT INTO tb_usuario SET ?', [newPost]);
        res.json({
            message: 'New Usuario Created'
        });
    });
}
exports.createUsuario = createUsuario;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield cnxMysql_1.connect();
        const posts = yield conn.query('SELECT * FROM posts WHERE id = ?', [id]);
        res.json(posts[0]);
    });
}
exports.getPost = getPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield cnxMysql_1.connect();
        yield conn.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({
            message: 'Post deleted'
        });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield cnxMysql_1.connect();
        yield conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
        res.json({
            message: 'Post Updated'
        });
    });
}
exports.updatePost = updatePost;
