const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

//importando função para validar os tokens
const validateToken = require('../util/token')[1]

//importando função para validar a nota
const validateNote = require('..//util/noteValidator')

//importando model de notas dos filmes
const filmModel = require('../models/filmsModel')
const noteModel = require('../models/noteModel')

//rotas relacionadas a notas
router.post('/addNote/:film',validateToken,(req,res)=>{
   
   let filmNote = req.body.note
   //filmNote = parseFloat(filmNote)
   let film = req.params.film
   let token = req.headers['authorization']
   token = token.split(" ")
   let userData = jwt.decode(token[1])
   let email = userData.email
   
   if(filmNote){
   let err = validateNote(filmNote)
   if(err.length == 0){
   filmModel.findOne({where:{titulo: film}}).then(film=>{
     if(film){
        noteModel.findOne({where: {user: email, filmId: film.id}}).then(note =>{
           if(note){
              console.log("A nota do usuário nesse filme já foi registrada")
              res.statusCode = 401
              res.json({err: "Uma nota para esse filme já foi dada pelo usuário"})
           }else{
               noteModel.create({
                  note: filmNote,
                  user: email,
                  filmId: film.id 
               }).then(()=>{
                  console.log("nota registrada com sucesso")
                  res.statusCode = 200
                  res.json({text: "Nota registrada com sucesso"})
               }).catch(err =>{
                  console.log(err)
                  res.statusCode = 500
                  res.json({err: "Erro interno ao registrar a nota"})
               })
               
           }
        })
     }else{
        res.statusCode = 404
        res.json({err: "O filme não existe"})
     }  
   }).catch(err=>{
      console.log(err)
      res.statusCode = 500
      res.json({err: "Erro interno ao cadastrar nota"})
   })
 }else{
   res.statusCode = 400
   res.json({err: "Nota inválida"})
 }
}else{
   res.statusCode = 400
   res.json({err: "A nota do filme não pode ser vazia"})
}  
   
})

module.exports = router