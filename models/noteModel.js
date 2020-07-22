const {Sequelize, sequelize} = require('../database/config')
const filmes = require('./filmsModel')

const notes = sequelize.define('notes',{
    
        note:{
             type:Sequelize.DOUBLE,
            allowNull: false
        },
        user: {
          type:Sequelize.STRING,
          allowNull: false
        }
    })

notes.belongsTo(filmes)

/*notes.sync({force: true}).then(()=>{
    console.log("Tabela criada com sucesso")
}).catch(err=>{
    console.log("Erro ao criar tabela: "+err)
})*/

module.exports = notes;

