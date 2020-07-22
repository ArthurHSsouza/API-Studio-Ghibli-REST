//importando módulos externos
const express = require('express')
const router = express.Router()

//importando módulos internos
const userValidate = require('../util/userValidator')
const passwordEncrypt = require('../util/passwordEncrypt')
const generateToken = require('../util/token')[0]
const login = require('../util/userLogin')

//importando model de usuários 
const userModel = require('../models/usersModel')

//rotas da aplicação
router.post('/signup',async(req,res)=>{
     var {email, password} = req.body
     var err = userValidate(email, password)
     if(err.length > 0){
        res.statusCode = 400
        res.json({err: err})
     }else{
        encrypPassword = await passwordEncrypt(password)
        console.log(encrypPassword)
        userModel.create({
           email: email,
           password: encrypPassword
        }).then(()=>{
           console.log("usuário criado com sucesso")
           res.statusCode = 200
           res.json({text: "Usuário criado com sucesso"})
        }).catch(err =>{
           console.log("Erro ao cadastrar usuário: "+err)
           res.statusCode = 500
           res.json({err: "Erro interno ao cadastrar usuário"})
        })
     }
})

router.post('/signin',(req,res)=>{
   var {email, password} = req.body
   var err = userValidate(email, password)
   if(err.length > 0){
       res.statusCode = 400
       res.json({err: err})
   }else{
        var user = login(email, password,res)
        if(user){
         var token = generateToken(email)
         res.statusCode = 200;
         res.json({token: token})
        }
   }
})
module.exports = router;