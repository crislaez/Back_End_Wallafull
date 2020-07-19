'use strict';

const conexion = require('./Conection');

//agregar producto
const addProduct = (product, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO productos SET ?`,product, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//obtener productos por usuario
const getProductByIdUser = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT productos.id_producto, productos.id_usuario, productos.categoria, productos.tipo_producto, productos.precio, productos.moneda, productos.descripcion, productos.publicacion, productos.foto_1, productos.foto_2, productos.foto_3, productos.foto_4, productos.foto_5, productos.foto_6, productos.foto_7, productos.foto_8, productos.foto_9, productos.foto_10, usuarios.nombre, usuarios.email FROM productos INNER JOIN usuarios ON productos.id_usuario = usuarios.id_usuario WHERE productos.id_usuario = ${conexion.escape(id)}`,(err, res) => {
            if(err){
                console.log(err);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//borrar producto
const removeProductByIdProduct = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM productos WHERE id_producto = ${conexion.escape(id)}`,(err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//mostrar productos por id productos
const getProductByIdProduct = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT productos.id_producto, productos.id_usuario, productos.categoria, productos.tipo_producto, productos.precio, productos.moneda, productos.descripcion, productos.publicacion, productos.foto_1, productos.foto_2, productos.foto_3, productos.foto_4, productos.foto_5, productos.foto_6, productos.foto_7, productos.foto_8, productos.foto_9, productos.foto_10, usuarios.nombre, usuarios.email, usuarios.foto_perfil FROM productos INNER JOIN usuarios ON productos.id_usuario = usuarios.id_usuario WHERE productos.id_producto =  ${conexion.escape(id)}`,(err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        addProduct,
        getProductByIdUser,
        removeProductByIdProduct,
        getProductByIdProduct
    }