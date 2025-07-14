# To-Do App com Login (React + Node.js)

Este projeto é uma aplicação de lista de tarefas com autenticação simples, desenvolvida com React no front-end e Node.js no back-end, utilizando API REST para comunicação entre as camadas.

## Objetivo do Projeto

O foco principal deste repositório é a organização e qualidade do versionamento com Git e GitHub. A proposta é demonstrar domínio em:

- Estruturação de branches por responsabilidade (`frontend`, `backend`, `main`)
- Escrita de commits claros, descritivos e bem segmentados
- Processo de desenvolvimento controlado por merges
- Organização geral de um projeto fullstack

Neste momento, a prioridade está na estrutura de Git e na construção de um fluxo de trabalho limpo e rastreável. A qualidade do código ainda está em desenvolvimento contínuo, com ajustes e melhorias planejadas para etapas futuras.

## Tecnologias Utilizadas

- Front-end: React com Vite
- Back-end: Node.js com Express
- Comunicação via API REST (fetch)
- Gerenciamento de estado simples (React hooks)

## Funcionalidades Implementadas

- Tela de login funcional com verificação básica
- API REST com endpoint `/login` e autenticação simulada
- Integração entre front-end e back-end
- Estrutura de pastas separada e organizada
- Projeto final unificado na branch `main` para testes completos

## Estrutura de Pastas

todo-app/
├── backend/         → API em Node.js
├── frontend/        → Aplicação React
├── README.md
└── .gitignore

## Como Executar Localmente

1. Clone o repositório:
   git clone https://github.com/jfiorindo/todo-app.git
   cd todo-app

2. Inicie o back-end:
   cd backend
   npm install
   node index.js

3. Inicie o front-end:
   cd ../frontend
   npm install
   npm run dev

4. Acesse no navegador: http://localhost:5173

Credenciais de teste:
- Email: admin@teste.com
- Senha: 1234

## Próximos Passos

- Implementar banco de dados para autenticação real
- Criar cadastro de usuários
- Desenvolver o CRUD completo de tarefas
- Melhorar a organização e escalabilidade do front-end

## Autor

Desenvolvido por João Pedro Fiorindo Pinto  
https://github.com/jfiorindo

