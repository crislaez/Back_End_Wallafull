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
        let foto_1,foto_2,foto_3,foto_4,foto_5,foto_6,foto_7,foto_8,foto_9,foto_10;

        const comprobarReqFoto = (reqFoto) => {
            let foto;        
            if(reqFoto){
                foto = process.env.RUTAIMAGEN+reqFoto.path.split('\\')[reqFoto.path.split('\\').length -1];
            }else{
                foto = '';
            }
            return foto;
        };

        foto_1 = comprobarReqFoto(req.files.foto_1);
        foto_2 = comprobarReqFoto(req.files.foto_2);
        foto_3 = comprobarReqFoto(req.files.foto_3);
        foto_4 = comprobarReqFoto(req.files.foto_4);
        foto_5 = comprobarReqFoto(req.files.foto_5);
        foto_6 = comprobarReqFoto(req.files.foto_6);
        foto_7 = comprobarReqFoto(req.files.foto_7);
        foto_8 = comprobarReqFoto(req.files.foto_8);
        foto_9 = comprobarReqFoto(req.files.foto_9);
        foto_10 = comprobarReqFoto(req.files.foto_10);        

        let product = 
            {
                id_producto:'',
                id_usuario:req.body.id_usuario,
                categoria:req.body.categoria,
                tipo_producto:req.body.tipo_producto,
                precio:req.body.precio,
                moneda:req.body.moneda,
                descripcion:req.body.descripcion,
                foto_1:foto_1,
                foto_2:foto_2,
                foto_3:foto_3,
                foto_4:foto_4,
                foto_5:foto_5,
                foto_6:foto_6,
                foto_7:foto_7,
                foto_8:foto_8,
                foto_9:foto_9,
                foto_10:foto_10,
                ubicacion:req.body.ubicacion
            };

        Database.addProduct(product,(err, data) => {
            if(err) return res.status(500).json({success:false, message:`error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:'error al subir el producto'});

            res.status(200).json({success:true, data:data});
        })
    });

    //obtener productos por id usuario ruta -> http://localhost:3001/api/getProductByIdUser/:id
    router.get('/getProductByIdUser/:id',(req, res) => {
        let id = req.params.id;

        Database.getProductByIdUser(id, (err, data) => {
            if(err) return res.status(500).json({success:false, messaga:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al obtener los datos`})

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointProduct;
