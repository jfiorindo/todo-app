import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Tarefas from './components/Tarefas';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper setUsuario={setUsuario} />} />
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

export default App;
