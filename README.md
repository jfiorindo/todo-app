# To-Do App com Login (React + Node.js + MongoDB)

Este projeto é uma aplicação de lista de tarefas com autenticação simples, desenvolvida com React no front-end e Node.js no back-end. A comunicação entre as camadas é feita via API REST e os dados são persistidos em um banco de dados MongoDB.

## 🎯 Objetivo do Projeto

O foco principal deste repositório é demonstrar domínio no **controle de versionamento com Git/GitHub**, além de apresentar uma arquitetura funcional de um projeto fullstack moderno.

**Destaques:**
- Branches separadas por responsabilidade (`frontend`, `backend`, `main`)
- Commits claros e descritivos com boa segmentação de funcionalidades
- Uso de MongoDB para persistência de dados reais
- Processo de desenvolvimento com merge controlado para branch `main`

Neste estágio, a prioridade está na **estrutura e rastreabilidade do projeto**. A qualidade do código está em constante evolução, com refatorações planejadas conforme o ciclo de melhoria contínua.

## 🛠️ Tecnologias Utilizadas

- **Front-end**: React + Vite
- **Back-end**: Node.js + Express
- **Banco de Dados**: MongoDB + Mongoose
- **Comunicação**: API REST via `fetch`
- **Gerenciamento de estado**: React Hooks

## ✅ Funcionalidades Implementadas

- Tela de login com verificação de credenciais fixas
- API REST com rotas:
  - `POST /login`
  - `POST /tasks`
  - `GET /tasks`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Persistência das tarefas no MongoDB
- Integração funcional entre front-end e back-end
- Estrutura organizada em pastas com separação por responsabilidade

## 📁 Estrutura de Pastas

todo-app/
├── backend/         → API em Node.js com MongoDB
│   └── models/      → Modelos do banco de dados (Mongoose)
├── frontend/        → Aplicação em React
├── README.md
└── .gitignore

## 🚀 Como Executar Localmente

1. Clone o repositório:
   git clone https://github.com/jfiorindo/todo-app.git
   cd todo-app

2. Inicie o back-end:
   cd backend
   npm install
   node index.js

   > Certifique-se de ter o MongoDB rodando localmente na porta `27017`.

3. Inicie o front-end:
   cd ../frontend
   npm install
   npm run dev

4. Acesse no navegador:
   http://localhost:5173

### 🔐 Credenciais de Teste

- **Email**: admin@teste.com  
- **Senha**: 1234

## 📌 Próximos Passos

- Autenticação real com banco de dados
- Cadastro de usuários
- Validação de sessão com tokens
- Interface aprimorada com design responsivo
- Upload e manipulação de dados complexos
- Deploy da aplicação

## 👨‍💻 Autor

Desenvolvido por [João Pedro Fiorindo Pinto](https://github.com/jfiorindo)
