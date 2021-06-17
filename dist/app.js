"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Routes
const index_router_1 = __importDefault(require("./routes/index.router"));
const routerLogin = __importStar(require("./routes/loginRoutes"));
const routerUsuario = __importStar(require("./routes/usuarioRoutes"));
const routerArea = __importStar(require("./routes/areaRoutes"));
const routerCliente = __importStar(require("./routes/clienteRoutes"));
const routerServicio = __importStar(require("./routes/servicioRoutes"));
const routerVersion = __importStar(require("./routes/versionRoutes"));
const routerProfile = __importStar(require("./routes/profileController"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.middlewares();
        this.settings();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_fileupload_1.default());
    }
    routes() {
        this.app.use(index_router_1.default);
        this.app.use('/api/login', routerLogin.default);
        this.app.use('/api/usuario', routerUsuario.default);
        this.app.use('/api/area', routerArea.default);
        this.app.use('/api/cliente', routerCliente.default);
        this.app.use('/api/servicio', routerServicio.default);
        this.app.use('/api/version', routerVersion.default);
        this.app.use('/api/profile', routerProfile.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.App = App;
