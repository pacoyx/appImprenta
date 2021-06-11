import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Usuario } from '../interfaces/Usuario';


export async function listUsuarios(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_USUARIO()');

        res.json({
            estado: 'ok',
            message: 'exitoso',
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


    const newPost: Usuario = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.email, newPost.password, newPost.nameUser,
    newPost.profileUser, newPost.area, newPost.statusUser];
    try {
        await conn.query('CALL SP_I_TB_USUARIO(?,?,?,?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'exito'
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
            message: 'exitoso'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}