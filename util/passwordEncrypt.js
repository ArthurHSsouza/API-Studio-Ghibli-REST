const bcrypt = require('bcrypt')
const util = require('util')

module.exports = async function(password){
   
    util.promisify(bcrypt.genSalt)

    try{
        var salt = await bcrypt.genSalt(10)
        var encrypPassword = bcrypt.hashSync(password, salt)
        return encrypPassword
        
    }catch(err){
        console.log(err) 
    }
 }
    
   
   