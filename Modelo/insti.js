const mongoose = require("mongoose")

const InforInstitu = new mongoose.Schema({
 nome: { type: String },

 descriçao: {type: String},
 
 img: {type: String},
 status: {
   type: String,

   enum:['pendente' , 'aceito' , 'rejeitado'],

   default:'pedente',
   }
})

module.exports = mongoose.model('imagen', InforInstitu); 