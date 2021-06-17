import * as dotenv from "dotenv";
dotenv.config();

import { createPool, Pool } from 'mysql2/promise'

let globalPool: Pool | undefined = undefined;

export async function connect(): Promise<Pool> {

    if (globalPool) {
        return globalPool;
    }

    globalPool = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        connectionLimit: 10
    });

    return globalPool;
}