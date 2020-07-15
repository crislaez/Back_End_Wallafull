'use strict';

require('dotenv').config();
const Database = require('../Database/QueryProducto');
// const jwt = require('jsonwebtoken');
const authFunction = require('../Middleware/AuthFunction');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'})

function endPointProduct(router){

    //registro usuarios ruta -> http://localhost:3001/api/addProduct
    router.post('/addProduct',authFunction,multipartMiddleware, (req, res) => {
        let product = 
            {
                id_producto:'',
                id_usuario:req.body.id_usuario,
                categoria:req.body.categoria,
                tipo_producto:req.body.tipo_producto,
                precio:req.body.precio,
                moneda:req.body.moneda,
                descripcion:req.body.descripcion,
                foto_1:process.env.RUTAIMAGEN+req.files.foto_1.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_2:process.env.RUTAIMAGEN+req.files.foto_2.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_3:process.env.RUTAIMAGEN+req.files.foto_3.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_4:process.env.RUTAIMAGEN+req.files.foto_4.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_5:process.env.RUTAIMAGEN+req.files.foto_5.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_6:process.env.RUTAIMAGEN+req.files.foto_6.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_7:process.env.RUTAIMAGEN+req.files.foto_7.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_8:process.env.RUTAIMAGEN+req.files.foto_8.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_9:process.env.RUTAIMAGEN+req.files.foto_9.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                foto_10:process.env.RUTAIMAGEN+req.files.foto_10.path.split('\\')[req.files.foto_1.path.split('\\').length -1],
                ubicacion:req.body.ubicacion
            };

        Database.addProduct(product,(err, data) => {
            if(err) return res.status(500).json({success:false, message:`error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:'error al subir el producto'});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPointProduct;