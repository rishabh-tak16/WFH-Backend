import DBConnection from "../src/databases/index";
import express, { Application } from "express";
import bodyParser from "body-parser";
import routes from "./router/users";
import mongoose from "mongoose";
import cors from "cors";

const server: Application = express();

DBConnection();
mongoose.createConnection();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(routes);

server.listen(5000, () => {
    console.log(`server listen at portno: ${5000}`);
});
