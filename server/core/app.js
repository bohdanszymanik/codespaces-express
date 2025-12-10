import express from "express";
import morgan from "morgan";
import { load_config } from "./config.js";


import bodyParser from 'body-parser';
import OAuthServer from 'express-oauth-server';
import model from '../model.js';

export function app_create() {
    const app = express();
    app.set("config", load_config())
    app.set("view engine", "ejs")
    app.set("views", "client/views")
    app.use(morgan('tiny'))
    // app.use(express.json())
    // app.use(express.urlencoded({extended: false}))
    // app.use(express.static('client/public'))

    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    return app;
}

export function app_run(app) {
    const config = app.get("config")

    // Initialize OAuth server
    app.oauth = new OAuthServer({
        model,
        accessTokenLifetime: 60 * 60, // 1 hour
        refreshTokenLifetime: 60 * 60 * 24 * 30 // 30 days
    });


    app.listen(config.port, () => {
        console.log(`Server is listening on http://localhost:${config.port}`)
    })

}