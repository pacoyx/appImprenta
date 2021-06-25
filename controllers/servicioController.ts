import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Servicio } from '../interfaces/Servicio';

export async function listar(req: Request, res: Response): Promise<Response | void> {

    try {

        let elbody = req.body;

        let parameters = [elbody.tipo, elbody.filtro];
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_SERVICIO(?,?)', parameters);

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

    if (elbody.idservicio == null
        || elbody.idservicio === ''
        || elbody.fechaCreacion == null
        || elbody.fechaCreacion === ''
        || elbody.idusuario == null
        || elbody.idusuario === ''
        || elbody.idcliente == null
        || elbody.idcliente === ''
        || elbody.codigoArticuloVenta == null
        || elbody.codigoArticuloVenta === ''
        || elbody.codigoArticuloGrafico == null
        || elbody.codigoArticuloGrafico === ''
        || elbody.tipo == null
        || elbody.tipo === ''
        || elbody.descripcion == null
        || elbody.descripcion === ''
        || elbody.item == null
        || elbody.item === ''
        || elbody.estado == null
        || elbody.estado === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    console.log('llego aki');
    console.log(req.body);

    const newPost: Servicio = req.body;
    const conn = await connect();
    let parameters = [newPost.idservicio, newPost.fechaCreacion, newPost.idusuario,
    newPost.idcliente, newPost.codigoArticuloVenta, newPost.codigoArticuloGrafico,
    newPost.tipo, newPost.descripcion, newPost.fechaEntregaProveedor, newPost.fechaEntregaVenta,
    newPost.estado, newPost.item];
    try {
        await conn.query('CALL SP_I_TB_SERVICIO(?,?,?,?,?,?,?,?,?,?,?,?)', parameters);
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

    if (elbody.idservicio == null
        || elbody.idservicio === ''
        || elbody.fechaCreacion == null
        || elbody.fechaCreacion === ''
        || elbody.idusuario == null
        || elbody.idusuario === ''
        || elbody.idcliente == null
        || elbody.idcliente === ''
        || elbody.codigoArticuloVenta == null
        || elbody.codigoArticuloVenta === ''
        || elbody.codigoArticuloGrafico == null
        || elbody.codigoArticuloGrafico === ''
        || elbody.tipo == null
        || elbody.tipo === ''
        || elbody.descripcion == null
        || elbody.descripcion === ''
        || elbody.item == null
        || elbody.item === ''
        || elbody.estado == null
        || elbody.estado === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    const newPost: Servicio = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idservicio, newPost.fechaCreacion, newPost.idusuario,
    newPost.idcliente, newPost.codigoArticuloVenta, newPost.codigoArticuloGrafico,
    newPost.tipo, newPost.descripcion, newPost.fechaEntregaProveedor, newPost.fechaEntregaVenta,
    newPost.estado, newPost.item];
    try {
        await conn.query('CALL SP_U_TB_SERVICIO(?,?,?,?,?,?,?,?,?,?,?,?)', parameters);
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

    if (elbody.idservicio == null
        || elbody.idservicio === ''
    ) {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });

    }
    const newPost: Servicio = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idservicio];
    try {
        await conn.query('CALL SP_D_TB_SERVICIO(?)', parameters);
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
