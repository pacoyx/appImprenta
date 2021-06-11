import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Cliente } from '../interfaces/Cliente';

export async function listar(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_CLIENTE()');

        res.json({
            estado: 'ok',
            message: 'successful',
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

export async function registrar(req: Request, res: Response) {

    let elbody = req.body;

    if (elbody == null) {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    if (elbody.idcliente == null
        || elbody.idcliente === ''
        || elbody.descripcion == null
        || elbody.descripcion === ''
        || elbody.correo == null
        || elbody.correo === ''
        || elbody.contacto == null
        || elbody.contacto === ''
        || elbody.movil == null
        || elbody.movil === ''
        || elbody.estado == null
        || elbody.estado === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }


    const newPost: Cliente = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idcliente, newPost.descripcion,
    newPost.correo, newPost.contacto, newPost.movil, newPost.estado];
    try {
        await conn.query('CALL SP_I_TB_CLIENTE(?,?,?,?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'successful'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}

export async function actualizar(req: Request, res: Response) {

    let elbody = req.body;

    if (elbody == null) {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    if (elbody.idcliente == null
        || elbody.idcliente === ''
        || elbody.descripcion == null
        || elbody.descripcion === ''
        || elbody.correo == null
        || elbody.correo === ''
        || elbody.contacto == null
        || elbody.contacto === ''
        || elbody.movil == null
        || elbody.movil === ''
        || elbody.estado == null
        || elbody.estado === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    const newPost: Cliente = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idcliente, newPost.descripcion, newPost.correo, newPost.contacto, newPost.movil, newPost.estado];
    try {
        await conn.query('CALL SP_U_TB_CLIENTE(?,?,?,?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'successful'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}



export async function eliminar(req: Request, res: Response) {

    let elbody = req.body;

    if (elbody == null) {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    if (elbody.idcliente == null
        || elbody.idcliente === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }
    const newPost: Cliente = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idcliente];
    try {
        await conn.query('CALL SP_D_TB_CLIENTE(?)', parameters);
        res.json({
            estado: 'ok',
            message: 'successful'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}