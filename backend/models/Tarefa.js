const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  feita: { type: Boolean, default: false },
  dataExpiracao: { type: Date },
  email: { type: String, required: true }, // <- vincula ao usuário
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', tarefaSchema);
