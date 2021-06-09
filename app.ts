import express, { Application } from 'express';
import morgan from 'morgan';
import cors from "cors";

// Routes
import IndexRoutes from './routes/index.router';

import * as routerLogin from './routes/loginRoutes';
import * as routerUsuario from './routes/usuarioRoutes';
import * as routerArea from './routes/areaRoutes';

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/login', routerLogin.default);
        this.app.use('/usuario', routerUsuario.default);
        this.app.use('/area', routerArea.default);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}