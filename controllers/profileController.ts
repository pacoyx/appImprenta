import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';

export async function listar(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_PROFILE()');

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