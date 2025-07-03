const mongoose = require('mongoose');

const analiseInstituicaoSchema = new mongoose.Schema({
  nome_da_instituicao: { type: String },

  Responsavel: { type: String },

  email: { type: String },

  tel: { type: Number },

  Cnpj: { type: Number },
  
  img: { type: String },
  Area_de_atuacao: { type: String },
  status: {
  type: String,
  enum: ['pendente', 'aceito', 'rejeitado'],
  default: 'pendente'
}
});

module.exports = mongoose.model('AnaliseInstituicao', analiseInstituicaoSchema);
