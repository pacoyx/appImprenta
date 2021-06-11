import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Usuario } from '../interfaces/Usuario';


export async function login(req: Request, res: Response): Promise<Response | void> {

    let elbody = req.body;

    if (elbody == null) {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    if (elbody.email == null
        || elbody.email === ''
        || elbody.password == null
        || elbody.password === '') {
        return res.status(400).json({ estado: 'error', message: 'request invalido' });
    }

    const newPost: Usuario = req.body;
    let parameters = [newPost.email, newPost.password];

    try {
        const conn = await connect();
        const result: any = await conn.query('CALL SP_S_LOGIN(?,?)', parameters);
        console.log('result[0]', result[0][0]);

        if (Object.keys(result[0][0]).length > 0) {
            res.json({
                estado: 'ok',
                message: 'login successful',
                data: result[0]
            });
        } else {
            res.json({
                estado: 'error',
                message: 'email o password equivocado',
                data: []
            });
        }


    } catch (error) {
        res.json({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}