import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Usuario } from '../interfaces/Usuario';



export async function listUsuarios(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_USUARIO()');

        res.json({
            estado: 'ok',
            message: 'lista de usuarios',
            data: result[0]
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}


export async function createUsuario(req: Request, res: Response) {
    const newPost: Usuario = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.email, newPost.password, newPost.nameUser, newPost.profileUser, newPost.area, newPost.statusUser];
    try {
        await conn.query('CALL SP_I_TB_USUARIO(?,?,?,?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'New Usuario Created'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}

export async function updateUsuario(req: Request, res: Response) {
    const newPost: Usuario = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.email, newPost.password, newPost.nameUser, newPost.profileUser, newPost.area, newPost.statusUser];

    try {
        await conn.query('CALL SP_U_TB_USUARIO(?,?,?,?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'New Usuario Created'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}