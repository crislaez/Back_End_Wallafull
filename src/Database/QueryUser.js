'use strict';

const conexion = require('./Conection');

//registrar usuario
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`,user, (err, res) => {
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

//login
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE email = ${conexion.escape(user.email)} AND clave = ${conexion.escape(user.clave)}`,(err, res) => {
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

//modificar
const updateUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`UPDATE usuarios SET foto_perfil = ${conexion.escape(user.foto_perfil)}, foto_banner = ${conexion.escape(user.foto_banner)}, nombre = ${conexion.escape(user.nombre)} WHERE id_usuario = ${conexion.escape(user.id_usuario)}`,(err, res) => {
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

//atualizar datos
const updateAccountUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`UPDATE usuarios SET nacimiento = ${conexion.escape(user.nacimiento)}, sexo = ${conexion.escape(user.sexo)} WHERE id_usuario = ${conexion.escape(user.id_usuario)}`,(err, res) => {
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
        addUser,
        login,
        updateUser,
        updateAccountUser
    }