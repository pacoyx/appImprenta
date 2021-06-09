import { Request, Response } from 'express'
import { connect } from '../configdb/cnxMysql';



export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
    res.json(posts[0]);
}

