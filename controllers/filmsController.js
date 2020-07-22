const fs = require('fs')
const express = require('express')
const router = express.Router()

//importando módulos internos úteis
const upload = require('../util/multerConfig')
const removeUnderscore = require('../util/underscoreRemove')
const FieldValidator = require('../util/filmValidator') 
const auth = require('../util/token')[1]

//Models 
const filmModel = require('../models/filmsModel')
const noteModel = require('../models/noteModel')

// Rotas
//retorna todos os jogos da base de dados
router.get('/films',(req,res)=>{

    filmModel.findAll().then(films =>{
      noteModel.findAll().then(notes =>{
           res.statusCode = 200
           res.json({films: films,notes: notes}) 
      }).catch(err =>{
          console.log(err)
          res.statusCode = 500
          res.json({err: "Erro ao retornar filmes"})
      })
    }).catch(err =>{
        console.log(err)
        res.statusCode = 500
        res.json({err: "Erro ao retornar filmes"})
    })
})

//retorna o jogo específico da base de dados
router.get('/film/:name',(req,res)=>{

   //tirando possíveis underscores do parametro da requisição, 
   //pois eles não serão necessários e podem atrapalhar no futuro
   var name = req.params.name
   name = removeUnderscore(name,req)
   
   //busca um filme na base de dados que possa o mesmo nome do filme enviado na requisição
   filmController.findOne({where:{titulo: name}}).then(film =>{
       if(film){
       //caso o objeto retornado não possua valor undefined, então envie um codigo OK
         res.statusCode = 200 
         res.json(film)
         
       }else{
       //caso ela seja um objeto vazio, envie um NOT FOUND e uma mensagem de texto para quem
       // fez a requisição dentro de um json 
           res.statusCode = 404
           res.json({text:"The film doesn't exist in the database"})
       }
      
   }).catch(err =>{
       //caso haja algum erro na pesquisa, retorne um código de erro interno
       console.log(err)
       res.statusCode = 500
       res.json({err: "Erro interno ao retornar o filme da base de dados"})
       
   })
})

//Cadastra um novo jogo na base de dados
router.post('/film',auth,upload,(req,res)=>{
   var image
   var {titulo, lancamento, descricao} = req.body
   if(req.file){
      image = __dirname+'/images/'+req.file.filename  
      image = image.replace("\\controllers","")
   }
   
   var err;
   
   err = FieldValidator(titulo, lancamento, descricao)
   if(err.length > 0){
       res.statusCode = 400
       res.json(err)
   }else{
       filmController.create({
           titulo: titulo,
           lancamento: lancamento,
           descricao: descricao,
           imagem: image 
       }).then(()=>{
           console.log("Filme salvo com sucesso")
           res.statusCode = 200 
           res.json({text: "Filme salvo com sucesso"})
           
          
       }).catch(err =>{
           console.log("Erro ao criar filme: "+err)
           res.statusCode = 500 
           res.json({err: "Erro interno ao salvar filme no banco de dados"})
          
       })  
   }  
})

//apaga o filme específico na base de dados
router.delete('/film/:name',auth,(req,res)=>{
     var name = req.params.name
     name = removeUnderscore(name,req)
     filmController.findOne({where:{titulo:name}}).then((film)=>{
        if(film){

            fs.unlinkSync(film.imagem)
            filmController.destroy({where:{titulo: name}}).then(()=>{
                res.statusCode = 200
                res.json({text: "Filme excluido com sucesso"})
            }).catch(err =>{
                console.log(err)
                res.statusCode = 500
                res.json({err: "Erro interno ao excluir filme"})
           })
        }else{
            res.statusCode = 404
            res.json({error: "Filme não encotrado"})
        }
     }).catch(err =>{
            console.log(err)
            res.statusCode = 500
            res.json({err: "Erro interno ao excluir filme"})
     })
    
})

//atualiza o filme específico na base de dados
router.put('/film/:name',upload,auth,(req,res)=>{
   var {titulo, lancamento, descricao, imagem} = req.body
   var name = req.params.name
   var err
  filmController.findOne({where:{titulo: name}}).then(film =>{
       if(film){  
           err = FieldValidator(titulo, lancamento, descricao)
           if(err.length != 0){
              res.statusCode = 400
              res.json({err: err})
           }else{  
           film.titulo = titulo
           film.lancamento = lancamento 
           film.descricao = descricao
           film.imagem = imagem
           
           film.save()
           res.statusCode = 200
           res.json({text: "Filme atualizado com sucesso"})      
           
          }  
       }else{
           res.statusCode = 404
           res.json({err: "Filme não encontrado"})
       }
       
   }).catch(err =>{
       console.log(err)
       res.statusCode = 500
       res.json({err: "Erro interno ao atualizar filme na base de dados"})
   })
})

module.exports = router;