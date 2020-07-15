'use strict';

require('dotenv').config();

const express = require('express');

const endPointUser = require('./Router/RouterUser');
const endPointProduct = require('./Router/RouterProducto');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//para poder coger la ruta de la carpeta htt://localhost:3001/img/nombrefoto.jpg
app.use('/img', express.static(__dirname + '/img', {
    maxAge: '12h'
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const router = express.Router();
app.use('/api',router);

endPointUser(router);
endPointProduct(router);

app.listen(process.env.PORT,() => console.log(`Api rest corriendo en ${process.env.RUTA}`))