module.exports = function(name, req){
  
    var name = req.params.name
     for(var i=0; i< name.length; i++){
     if(name[i] === "_"){
       name = name.replace(name[i]," ")
     }
    }
   return name
}

