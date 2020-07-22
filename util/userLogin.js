const userModel = require('../models/usersModel')
const bcrypt = require('bcrypt')
const util  = require('util')

//transforma a função numa promise
util.promisify(userModel.findOne)


// efetua a validação de login de usuário no banco de dados
module.exports = async function(email, password,res){
     
    try{
        var user = await userModel.findOne({where:{email:email}})
        if(user){
             if(bcrypt.compareSync(password, user.password)){
                 return true;
             }else{
                 res.statusCode = 401
                 res.json({err: "Senha incorreta"})
                 return false;
             }
        }else{
            res.statusCode = 404
            res.json({err: "Usuário não encontrado"})
            return false;
        }
    }catch(err){
        console.log(err)
        res.statusCode = 500
        res.json({err: "Erro interno ao fazer login"})
        return false;
    }   
}