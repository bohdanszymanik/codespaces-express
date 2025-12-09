import express from "express";
import morgan from "morgan";
import { load_config } from "./config";

export function app_create() {
    const app = express();
    app.set("view engine", "ejs")
    app.set("views", "client/views")
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(express.static('client/public'))
    return app;
}

export function app_run(app) {

}