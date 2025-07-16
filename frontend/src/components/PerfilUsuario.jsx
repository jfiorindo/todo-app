import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css';

const COLORS = ['#44c781', '#ff6b6b'];

export default function PerfilUsuario({ usuario }) {
  const [tarefas, setTarefas] = useState([]);
  const [novoNome, setNovoNome] = useState(usuario.nome);
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await fetch(`http://localhost:3001/tasks?email=${usuario.email}`);
        const dados = await resposta.json();
        setTarefas(dados);
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
      }
    }
    carregarTarefas();
  }, [usuario.email]);

  const total = tarefas.length;
  const feitas = tarefas.filter(t => t.feita).length;
  const pendentes = total - feitas;

  const atualizarPerfil = async () => {
    try {
      const resposta = await fetch(`http://localhost:3001/usuarios/${usuario.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome, senha: novaSenha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem('Perfil atualizado com sucesso!');
      } else {
        setMensagem(dados.erro || 'Erro ao atualizar perfil');
      }
    } catch (err) {
      setMensagem('Erro de conexão com o servidor');
    }
  };

  const dadosGrafico = [
    { name: 'Feitas', value: feitas },
    { name: 'Pendentes', value: pendentes },
  ];

  return (
    <>
      <button className="voltar-button" onClick={() => navigate('/tarefas')}>
        ← Voltar para Tarefas
      </button>

      <div className="perfil-container">
        <h2 className="perfil-titulo">Perfil de {usuario.nome}</h2>

        <div className="painel-tarefas">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dadosGrafico}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dadosGrafico.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="form-perfil">
          <h3>Atualizar dados de acesso</h3>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Novo nome"
          />
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Nova senha (opcional)"
          />
          <button onClick={atualizarPerfil}>Atualizar Perfil</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
      </div>
    </>
  );
}