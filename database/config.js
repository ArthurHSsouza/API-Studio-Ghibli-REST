const Sequelize = require('sequelize')
const sequelize = new Sequelize('Studio_Ghibli_API','root','18901347a',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("Conectado com sucesso ao MySQL")
}).catch(err=>{
    console.log("Erro ao se conectar ao MySQL: "+err)
})

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize
}
