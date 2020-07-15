'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

function authFunction(req, res, next){

    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
            if(err){
                return res.status(403).json({success:false, message:`el token ha expirado`});
            }else{
                next();
            }
        })
    }else{
        return res.status(401).json({success:false, message:'debes estar logueado'});
    }
}

module.exports = authFunction;