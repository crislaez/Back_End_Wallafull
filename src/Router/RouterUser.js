'use strict';

require('dotenv').config();
const Database = require('../Database/QueryUser');
const jwt = require('jsonwebtoken');
const authFunction = require('../Middleware/AuthFunction');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'});

function endPointUser(router){

    //registro usuarios ruta -> http://localhost:3001/api/addUser
    router.post('/addUser', (req, res) => {
        let user = 
            {
                id_usuario:'',
                nombre: req.body.nombre,
                email:req.body.email,
                clave:req.body.clave,
                foto_perfil:'',
                foto_banner:'',
                nacimiento:'',
                sexo:''
            };
        
        Database.addUser(user, (err, data) => {
            if(err) return res.status(500).json({success: false, message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({success: false, message: `Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    });

    //login ruta -> http://localhost:3001/api/login
    router.post('/login',(req, res) => {
        let user = 
            {
                email:req.body.email,
                clave:req.body.clave
            };

        Database.login(user, (err, data) => {
            if(err) return res.status(500).json({success: false, message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({success: false, message: `Error al devolver los datos`});
            //creamos el token
            const wallafullroken = jwt.sign({id:user.email}, process.env.SECRET_TOKEN,{expiresIn: 60 * 60 * 24});
            res.status(200).json({success:true, data:data, wallafullroken:wallafullroken});
        })
    });

    //login ruta -> http://localhost:3001/api/updateUser/:id
    router.put('/updateUser/:id',authFunction,multipartMiddleware,(req, res) => {
        let user = 
            {
                id_usuario:req.params.id,
                foto_perfil:process.env.RUTAIMAGEN+req.files.foto_perfil.path.split('\\')[req.files.foto_perfil.path.split('\\').length -1],
                foto_banner:process.env.RUTAIMAGEN+req.files.foto_banner.path.split('\\')[req.files.foto_banner.path.split('\\').length -1],
                nombre:req.body.nombre
            };
            console.log(user)

        Database.updateUser(user,(err, data) => {
            if(err) return req.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return req.status(404).json({success:false, message:`Error al actualizar los datos`});

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointUser;