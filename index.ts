


import * as dotenv from "dotenv";
dotenv.config();

import { App } from './app'
import { connect } from './configdb/cnxMysql';

async function main() {
    const app = new App(process.env.PORT);
    await app.listen();
}

main();