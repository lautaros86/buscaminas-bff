import dotennv from 'dotenv'
import Server from "./server";
dotennv.config();

const server = new Server();

server.listen();
