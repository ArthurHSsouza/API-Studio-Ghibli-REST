module.exports = function(note){
   var err = []
   if(note > 10){
       err.push({err: "A nota não pode ser maior que 10"})
   }
   if(note < 0){
       err.push({err: "A nota não pode ser menor que 0"})
   }
       
   return err
}