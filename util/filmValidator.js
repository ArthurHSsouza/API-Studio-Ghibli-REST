
module.exports = function(titulo,lancamento,descricao){
    
   var err = []
   if(titulo == null || titulo == "" || titulo==undefined){
    err.push({text: "Título inválido"})
    }
    if(lancamento == null || lancamento == "" || lancamento == undefined){
    err.push({text: "Data de lançamento inválida"})
    } 
    if(descricao == null || descricao == "" || descricao == undefined){
    err.push({text: "Descrição inválida"})
    }

    return err;
  }