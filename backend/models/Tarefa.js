const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  feita: {
    type: Boolean,
    default: false,
  },
  dataExpiracao: {
    type: Date,
    required: false, // pode ser opcional
  }
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', TarefaSchema);
