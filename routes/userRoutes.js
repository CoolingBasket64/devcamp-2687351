const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const UsersModel = require('../models/UsersModel');


 //traer todos los users
 router.get('/',
 async(request, response)=> {
     try {
         const  user = 
         await UsersModel.find()

         if(user.length === 0){
             return response.
                status(404).
                json({
                    success: false, 
                    msg: "No hay usuarios disponibles"
                })
        }

         response
             .status(200)
             .json({
                 "success": true,
                 "results": user
             })
     } catch (error) {
         response
             .status(500)
             .json({
                 success: false, 
                 msg: "Error interno de servidor"
             })
     }
     
 });



//crear user
router.post('/', 
            async(req, res) =>{
                try {
                    const user = 
                        await UsersModel.create(req.body)
        
                    res
                        .status(201)
                        .json({
                            success : true, 
                            data: user
                        })
            
                } catch (error) {
                     res
                        .status(400)
                        .json({
                            success: false, 
                            msg: error.message
                        })
                }  
               
            })

module.exports = router