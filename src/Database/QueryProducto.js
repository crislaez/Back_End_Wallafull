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

module.exports = 
    {
        addProduct
    }