const mongoose  = require("mongoose")

const volutariosSchema = new mongoose.Schema({
  nome : { type: String},
  sobrenome : { type: String},
});

module.exports = mongoose.model("CadVolu", volutariosSchema)

