module.exports = function(email, password){
        var err = []
        if(email == "" || email == null || email == undefined){
            err.push({text: "O e-mail não pode ser vazio"})
        }
        if(password == "" || password == null || password == undefined){
            err.push({text: "A senha não pode ser vazia"})
        }
        return err

}