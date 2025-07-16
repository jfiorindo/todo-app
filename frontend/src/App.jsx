import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Tarefas from './components/tarefas';
import Cadastro from './components/cadastro';


function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<CadastroWrapper />} />
        <Route path="/tarefas" element={<Tarefas usuario={usuario} />} />
      </Routes>
    </Router>
  );
}

function LoginWrapper({ setUsuario }) {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUsuario(user);          // Salva o usuário logado
    navigate('/tarefas');      // Redireciona após login
  };

  return <Login onLogin={handleLogin} />;
}

function CadastroWrapper() {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/');
  };

  return <Cadastro onCadastroSucesso={irParaLogin} />;
}


export default App;
