const {Sequelize, sequelize} = require('../database/config')

 const user = sequelize.define('users',{
     email:{
         type: Sequelize.STRING,
         allowNull: false
     },
     password:{
         type: Sequelize.STRING,
         allowNull: false
     }
 })

 /*user.sync().then(()=>{
     console.log("Tabela de usuários criada com sucesso")
 }).catch(err =>{
     console.log("Erro ao criar tabela de usuários: "+err)
 })*/

 module.exports = user

 