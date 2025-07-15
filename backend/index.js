const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Tarefa = require('./models/Tarefa');

const app = express();
const PORT = 3001;

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Conectado ao MongoDB'))
.catch((err) => console.error('🔴 Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está rodando 🚀');
});

// Rota de login (fixa)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'admin@teste.com' && senha === '1234') {
    res.json({
      sucesso: true,
      usuario: {
        nome: 'Admin',
        email: 'admin@teste.com',
        token: 'fake-jwt-token-123',
      },
    });
  } else {
    res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
  }
});

// POST /tasks - adicionar nova tarefa ao MongoDB
app.post('/tasks', async (req, res) => {
  try {
    const { texto } = req.body;
    if (!texto) return res.status(400).json({ erro: 'Texto é obrigatório' });

    const novaTarefa = new Tarefa({ texto });
    const tarefaSalva = await novaTarefa.save();

    res.status(201).json(tarefaSalva);
  } catch (err) {
    console.error('Erro ao salvar tarefa:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});


// GET /tasks - listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
});

// PUT /tasks/:id - alternar status
app.put('/tasks/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    tarefa.feita = !tarefa.feita;
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
});

// DELETE /tasks/:id - excluir tarefa
app.delete('/tasks/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
