'use strict';

const conexio = require('./Conection');

//agregar producto
const addProduct = (product, callback) => {
    // conexio.connect();
    if(conexio){
        conexio.query(`INSERT INTO producto SET ?`,product, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexio.end();
}

//obtener productos por usuario
const getProductByIdUser = (id, callback) => {
    // conexio.connect();
    if(conexio){
        conexio.query(`SELECT producto.id_producto, producto.id_usuario, producto.categoria, producto.tipo_producto, producto.precio, producto.moneda, producto.descripcion, producto.foto_1, producto.foto_2, producto.foto_3, producto.foto_4, producto.foto_5, producto.foto_6, producto.foto_7, producto.foto_8, producto.foto_9, producto.foto_10, usuarios.nombre, usuarios.email FROM producto INNER JOIN usuarios ON producto.id_usuario = usuarios.id_usuario WHERE producto.id_usuario = ${id}`,(err, res) => {
            if(err){
                console.log(err);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexio.end();
}

module.exports = 
    {
        addProduct,
        getProductByIdUser
    }