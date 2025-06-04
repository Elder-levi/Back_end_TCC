const mongoose = require("mongoose")

const InforInstitu = new mongoose.Schema({
 nome: { type: String },
 descriçao: {type: String},
 img: {type: String},
})

module.exports = mongoose.model('imagen', InforInstitu); 