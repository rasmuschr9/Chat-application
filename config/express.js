/**
 * Created by RasmusChristiansen on 10/03/2017.
 */
var http = require("http");
var path = require("path");

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = function() {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    require('../app/routes/index.server.routes.js')(app);

    app.use(express.static('./public'));

    app.use(express.static('../app/views'));

    return app;
};