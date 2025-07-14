const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // permite requisições do front
app.use(express.json()); // permite ler JSON no corpo da requisição

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está rodando 🚀');
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação de autenticação
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
