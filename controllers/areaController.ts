import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Area } from '../interfaces/Area';



export async function listAreas(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_AREA()');

        res.json({
            estado: 'ok',
            message: 'lista de areas',
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


export async function createArea(req: Request, res: Response) {
    const newPost: Area = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idarea, newPost.descripcion, newPost.estado];
    try {
        await conn.query('CALL SP_I_TB_AREA(?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'Area Creada'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}

export async function updateArea(req: Request, res: Response) {
    const newPost: Area = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idarea, newPost.descripcion, newPost.estado];
    try {
        await conn.query('CALL SP_U_TB_AREA(?,?,?)', parameters);
        res.json({
            estado: 'ok',
            message: 'Area Actualizada'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}

export async function deleteArea(req: Request, res: Response) {
    const newPost: Area = req.body;
    const conn = await connect();
    console.log([newPost]);
    let parameters = [newPost.idarea];
    try {
        await conn.query('CALL SP_D_TB_AREA(?)', parameters);
        res.json({
            estado: 'ok',
            message: 'Area eliminada'
        });
    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}