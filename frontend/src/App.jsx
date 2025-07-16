import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Tarefas from './components/tarefas';
import Cadastro from './components/cadastro';
import PerfilUsuario from './components/PerfilUsuario';



function App() {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario');
    return salvo ? JSON.parse(salvo) : null;
  });



  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper setUsuario={setUsuario} />} />
        <Route path="/cadastro" element={<CadastroWrapper />} />
        <Route path="/tarefas" element={<Tarefas usuario={usuario} />} />
        <Route path="/perfil" element={<PerfilUsuario usuario={usuario} />} />
      </Routes>
    </Router>
  );
}

function LoginWrapper({ setUsuario }) {
  const navigate = useNavigate();

  const handleLogin = (user) => {
  setUsuario(user); // Salva no estado
  localStorage.setItem('usuario', JSON.stringify(user)); // Salva no localStorage
  navigate('/tarefas');
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
