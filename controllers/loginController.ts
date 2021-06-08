

import { Request, Response } from 'express'

// DB
import { connect } from '../configdb/cnxMysql';
// Interfaces
import { Usuario } from '../interfaces/Usuario';



export async function getUsuarios(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM usuario');
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createUsuario(req: Request, res: Response) {
    const newPost: Usuario = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO tb_usuario SET ?', [newPost]);
    res.json({
        message: 'New Usuario Created'
        
    });
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
    res.json(posts[0]);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM posts WHERE id = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: Usuario = req.body;
    const conn = await connect();
    await conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'Post Updated'
    });
}