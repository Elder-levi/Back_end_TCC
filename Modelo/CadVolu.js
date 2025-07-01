const mongoose  = require("mongoose")

const volutariosSchema = new mongoose.Schema({
  nome : { type: String},

  sobrenome : { type: String},

   status: {
   type: String,

   enum:['pendente' , 'aceito' , 'rejeitado'],
   
   default:'pedente',
   }
});

module.exports = mongoose.model("CadVolu", volutariosSchema)

