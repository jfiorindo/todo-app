import { useState } from 'react';
import '../styles/cadastro.css';

export default function Cadastro({ onCadastroSucesso }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      const resposta = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSucesso('Cadastro realizado com sucesso!');
        onCadastroSucesso && onCadastroSucesso();
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setErro(dados.erro || 'Erro ao cadastrar');
      }
    } catch (err) {
      setErro('Erro de conexão com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}
      </form>
      
      <div className="login-redirect">
        <p>Já tem uma conta?</p>
        <button type="button" onClick={onCadastroSucesso}>
            Fazer login
        </button>
    </div>

    </div>
  );
}