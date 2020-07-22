 const {Sequelize, sequelize} = require('../database/config')


  const film = sequelize.define('films',{
      titulo:{
          type: Sequelize.STRING,
          allowNull: false
      },
      lancamento:{
          type: Sequelize.DATE,
          allowNull: false
      },
      descricao:{
          type: Sequelize.TEXT,
          allowNull: false
      },
      imagem:{
          type: Sequelize.STRING,
          allowNull: true
      }
  })


/*film.sync({force: true}).then(()=>{
    console.log("Tabela criada com sucesso")
}).catch(err=>{
    console.log("Erro ao criar tabela: "+err)
})*/

module.exports = film;