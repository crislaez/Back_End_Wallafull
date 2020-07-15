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
module.exports = 
    {
        addUser,
        login
    }