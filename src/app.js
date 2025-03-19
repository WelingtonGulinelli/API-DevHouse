const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes')

class App {
    constructor() {
        this.server = express();



        mongoose.connect('Sua URL do mongo db aqui. Nao esqueca da Senha!!').then(() => console.log("MongoDB conectado!"))
            .catch(err => console.log("Erro ao conectar ao MongoDB:", err));


        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;