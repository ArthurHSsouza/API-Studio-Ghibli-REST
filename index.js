//importando módulos externos
const express = require('express')
const util = require('util')
const cors = require('cors')

//configurando módulos
//instanciando express
const app = express()

//Configurando arquivos estáticos
app.use(express.static(__dirname+"/images"))

//Definindo middleware para extração de dados da requisição
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Configurando cors como middleware para poder receber requisições externas na API
app.use(cors())
//

//importando Controllers das rotas 
const filmRouter = require('./controllers/filmsController')
const userRouter = require('./controllers/usersController')
const noteRouter = require('./controllers/notesController')

//Definindo middleware para usar as rotas externas do CRUD
app.use('/filmcrud',filmRouter)
app.use('/user',userRouter)
app.use('/note',noteRouter)

//Conectando a aplicação em sua respectiva porta
const PORT = 8080
app.listen(PORT,err=>{
    if(err){
        console.log("Erro ao se conectar no servidor: "+err)
    }else{
        console.log("Conectado com sucesso na porta: "+PORT)
    }
})