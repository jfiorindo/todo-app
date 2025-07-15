import { useState } from 'react';
import Login from './components/login';
import Tarefas from './components/tarefas';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <>
      {!usuario ? (
        <Login onLogin={setUsuario} />
      ) : (
        <div>
          <h2>Bem-vindo, {usuario.nome}</h2>
          <p>{usuario.email}</p>
        </div>
      )}
    </>
  );
}

export default App;
