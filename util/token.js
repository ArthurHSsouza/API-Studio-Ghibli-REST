const jwt = require('jsonwebtoken')
const secretKey = "bolinho de manteiga"

/*exporta um array contendo duas funções, de criação de tokens e de validação.
as funções devem ser escolhidas através de um index passado junto com a chamada 
da função*/

module.exports = [
  
    //função para criar o token
   function(email){
   var token = jwt.sign({email: email},secretKey,{expiresIn: '72h'})
   return token
   },

   //função para validar o token
      function auth(req,res,next){
         const bearerToken = req.headers['authorization']
           if(bearerToken != undefined){

              //quebra o token enviado, tirando a parte onde está escrito "bearer"
              //isso evita que ocorram erros na hora de validar o token em si
              var token = bearerToken.split(" ")
              
              //valida tokens
              jwt.verify(token[1], secretKey,(err,data)=>{
               if(err){
                  //caso o token seja inválido, envia não autorizado
                  res.statusCode = 401
                  res.json({err: "Token inválido"})
               }else{
                  next() 
               }
            })  
           }else{
              //caso o token venha vazio, envia não autorizado
               res.statusCode = 401
               res.json({err: "o token não pode ser vazio"})
         }   
     }
   ]