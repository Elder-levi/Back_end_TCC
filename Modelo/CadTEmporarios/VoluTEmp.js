const mongoose = require('mongoose');

const analiseVoluntario = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String },
  email: { type: String },
  Data_de_Nascimento: { type: String },
  telefone: { type: String },
  CPF: { type: Number },
    
  Genero: { type: String},

  escolaridade: { type: String },
  curso: { type: String },
   

  disponibilidade: {
    dias: [String], 
    horarios: [String], 
  },

status: {
  type: String,
  enum: ['pendente', 'aceito', 'rejeitado'],
  default: 'pendente' 
}
});

module.exports = mongoose.model('AnaliseVoluntario', analiseVoluntario);
