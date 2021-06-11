import express, { Application } from 'express';
import morgan from 'morgan';
import cors from "cors";
import fileUpload from 'express-fileupload';

// Routes
import IndexRoutes from './routes/index.router';

import * as routerLogin from './routes/loginRoutes';
import * as routerUsuario from './routes/usuarioRoutes';
import * as routerArea from './routes/areaRoutes';
import * as routerCliente from './routes/clienteRoutes';
import * as routerServicio from './routes/servicioRoutes';
import * as routerVersion from './routes/versionRoutes';
import * as routerProfile from './routes/profileController';

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
        this.app.use(fileUpload());
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/login', routerLogin.default);
        this.app.use('/usuario', routerUsuario.default);
        this.app.use('/area', routerArea.default);
        this.app.use('/cliente', routerCliente.default);
        this.app.use('/servicio', routerServicio.default);
        this.app.use('/version', routerVersion.default);
        this.app.use('/profile', routerProfile.default);
        

    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}