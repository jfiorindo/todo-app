const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Tarefa = require('./models/Tarefa');
const Usuario = require('./models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET = 'minha-chave-secreta';

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

// Rota de registro de usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    const salvo = await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: salvo });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

// Rota de login com autenticação real
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      console.log('❌ Usuário não encontrado');
      return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
    }

    const confere = await bcrypt.compare(senha, usuario.senha);
    console.log('🔐 Comparação da senha:', confere);

    if (!confere) {
      return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, SECRET, { expiresIn: '1d' });

    res.json({
      sucesso: true,
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
        token,
      },
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});


// Proteção com middleware (opcional, se quiser proteger rotas)
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
}

// POST /tasks - adicionar nova tarefa ao MongoDB
app.post('/tasks', async (req, res) => {
  try {
    const { texto, dataExpiracao } = req.body;
    if (!texto) return res.status(400).json({ erro: 'Texto é obrigatório' });

    const novaTarefa = new Tarefa({
      texto,
      dataExpiracao: dataExpiracao ? new Date(dataExpiracao) : undefined,
    });

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

// PUT /tasks/:id - editar tarefa
app.put('/tasks/:id', async (req, res) => {
  try {
    const { texto, feita, dataExpiracao } = req.body;

    const atualizacoes = {};
    if (texto !== undefined) atualizacoes.texto = texto;
    if (feita !== undefined) atualizacoes.feita = feita;
    if (dataExpiracao !== undefined) atualizacoes.dataExpiracao = new Date(dataExpiracao);

    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
      req.params.id,
      atualizacoes,
      { new: true }
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json(tarefaAtualizada);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
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
