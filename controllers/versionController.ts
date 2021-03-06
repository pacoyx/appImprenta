import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';
import path from 'path'
import moment from 'moment';
import { Version } from '../interfaces/Version';

export async function downloadFile(req: Request, res: Response) {
    const fileName = req.body.fileName;
    const directoryPath = path.join(__dirname + '../../') + 'public/images/';

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
}

export async function downloadFile2(req: Request, res: Response) {

    const fileName = req.body.fileName;

    const directoryPathtest = path.join(__dirname + '../../') + 'public/images/';
    console.log(directoryPathtest + fileName);

    res.sendFile(directoryPathtest + fileName);

}

export async function registerVersionWithOutFile(req: Request, res: Response) {

    let param = req.body;

    let version: Version = {
        idservicio: param.idservicio,
        nombreArchivo: '',
        file_src: '',
        tipo: param.tipo,
        fecha: moment().format(),
        usuario: param.usuario,
        comentario: param.comentario,
        idversion: 0,
        item: 0,
        servicio_Item: param.servicioItem,
        nombreArchivoOriginal: '',
        mimetype: ''
    }

    let resp = await registrarVersion(version);
    if (resp.estado === 'ok') {
        res.json(resp);
    } else {
        console.log('ocurrio un error al grabar version en bd', resp.error);
        res.json(resp);
    }

}
export async function registerVersionWithFile(req: Request, res: Response) {

    console.log(req.files);
    console.log(req.body);
    console.log(moment().format());


    let pUsuario = req.body.usuario;
    let pIdServicio = req.body.idservicio;
    let pNombreArchivo = '';
    let pNombreArchivoOriginal = '';
    let pFileSrc = '';
    let pTipo = req.body.tipo;
    let pFecha = moment().format();
    let pComentario = req.body.comentario;
    let pServicioItem = req.body.servicioItem;
    let pMimeType = '';

    let controlFile: any;
    let uploadPath;



    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se cargaron archivos.');
    }



    controlFile = req.files.uploadFile;
    var fileName = controlFile.name;
    const newFileName = new Date().getTime() + '_' + fileName;
    pMimeType = controlFile.mimetype;

    uploadPath = path.join(__dirname + '../../') + 'public/images/' + newFileName;

    pFileSrc = uploadPath;
    pNombreArchivoOriginal = fileName;
    pNombreArchivo = newFileName;

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
            servicio_Item: pServicioItem,
            nombreArchivoOriginal: pNombreArchivoOriginal,
            mimetype: pMimeType
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

    const newPost: any = req.body;
    let parameters = [newPost.idservicio, newPost.item, newPost.profile];
    try {
        const conn = await connect();
        const result = await conn.query('CALL SP_S_TB_VERSION_SERVICIO(?,?,?)', parameters);

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
    newPost.tipo, newPost.fecha, newPost.usuario, newPost.comentario, newPost.servicio_Item,
    newPost.nombreArchivoOriginal, newPost.mimetype];
    try {
        await conn.query('CALL SP_I_TB_VERSION(?,?,?,?,?,?,?,?,?,?)', parameters);
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