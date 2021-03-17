import express, {Application} from 'express'
import gameRoutes from './routes/game'
import cors from 'cors';
import {db} from "./db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        games: '/api/games'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    async dbConnection() {
        try {
            await db();
            console.log('base conectada')
        } catch (err: any) {
            throw new Error(err)
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.games, gameRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('El servidor esta ejecutandose en el puerto ' + this.port)
        })
    }
}

export  default Server;
