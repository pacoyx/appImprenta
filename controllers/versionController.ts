import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import { Servicio } from '../interfaces/Servicio';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import moment from 'moment';
import { Version } from '../interfaces/Version';


export async function uploadFile(req: Request, res: Response) {

    console.log(req.files);
    console.log(req.body);
    console.log(moment().format());

    let pUsuario = req.body.usuario;
    let pIdServicio = req.body.idservicio;
    let pNombreArchivo = '';
    let pFileSrc = '';
    let pTipo = req.body.tipo;
    let pFecha = moment().format();
    let pComentario = req.body.comentario;

    let controlFile: any;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se cargaron archivos.');
    }

    controlFile = req.files.uploadFile;
    var fileName = controlFile.name;
    var uuidname = uuidv4() + '_';


    if (controlFile.mimetype === 'image/jpeg' || controlFile.mimetype === 'image/png' || controlFile.mimetype === 'image/jpg') {
        uploadPath = path.join(__dirname + '../../') + 'public/images/' + uuidname + fileName;
    } else {
        uploadPath = path.join(__dirname + '../../') + 'public/docs/' + uuidname + fileName;
    }

    pFileSrc = uploadPath;
    pNombreArchivo = fileName;

    controlFile.mv(uploadPath, async function (err: any) {

        if (err)
            return res.status(500).send(err);

        let version: Version = {
            idservicio: pIdServicio,
            nombreArchivo: pNombreArchivo,
            file_src: pFileSrc,
            tipo: pTipo,
            fecha: pFecha,
            usuario: pUsuario,
            comentario: pComentario,
            idversion: 0,
            item: 0,
        }

        let resp = await registrarVersion(version);
        if (resp.estado === 'ok') {
            res.json(resp);
        } else {
            console.log('ocurrio un error al grabar version en bd', resp.error);
            res.json(resp);
        }

    });

}

export async function listarxServicio(req: Request, res: Response): Promise<Response | void> {

    const newPost: Version = req.body;
    let parameters = [newPost.idservicio];
    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_VERSION_SERVICIO(?)', parameters);

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

export async function listarTodos(req: Request, res: Response): Promise<Response | void> {

    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_VERSION()');

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


async function registrarVersion(newPost: Version) {
    const conn = await connect();
    let parameters = [newPost.idservicio, newPost.nombreArchivo, newPost.file_src,
    newPost.tipo, newPost.fecha, newPost.usuario, newPost.comentario];
    try {
        await conn.query('CALL SP_I_TB_VERSION(?,?,?,?,?,?,?)', parameters);
        return ({
            estado: 'ok',
            message: 'successful'
        });
    } catch (error) {
        return ({
            estado: 'error',
            message: 'Ocurrio un problema',
            error
        });
    }
}