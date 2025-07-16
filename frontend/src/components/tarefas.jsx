import { useEffect, useState } from 'react';
import '../styles/tarefas.css';

export default function Tarefas({ usuario }) {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaDataExpiracao, setNovaDataExpiracao] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await fetch(`http://localhost:3001/tasks?email=${usuario.email}`);
        const dados = await resposta.json();
        setTarefas(dados);
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;

    try {
      const resposta = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto: novaTarefa,
          dataExpiracao: novaDataExpiracao,
          email: usuario.email,
        }),
      });

      const nova = await resposta.json();
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
      setNovaDataExpiracao('');
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  };

  const alternarTarefa = async (id, feitaAtual) => {
    try {
      const resposta = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feita: !feitaAtual }),
      });

      const atualizada = await resposta.json();
      setTarefas(tarefas.map(t => (t._id === id ? atualizada : t)));
    } catch (err) {
      console.error('Erro ao alternar tarefa:', err);
    }
  };

  const removerTarefa = async (id) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });

      setTarefas(tarefas.filter(t => t._id !== id));
    } catch (err) {
      console.error('Erro ao remover tarefa:', err);
    }
  };

  const iniciarEdicao = (index) => {
    const novas = [...tarefas];
    novas[index].editando = true;
    setTarefas(novas);
  };

  const cancelarEdicao = (index) => {
    const novas = [...tarefas];
    novas[index].editando = false;
    setTarefas(novas);
  };

  const salvarEdicao = async (id, index) => {
    const tarefa = tarefas[index];
    try {
      const resposta = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto: tarefa.texto,
          dataExpiracao: tarefa.dataExpiracao,
        }),
      });

      if (resposta.ok) {
        const novas = [...tarefas];
        novas[index].editando = false;
        setTarefas(novas);
      }
    } catch (err) {
      console.error('Erro ao editar tarefa', err);
    }
  };

  return (
    <div className="tarefas-container">
      <h2 className="titulo">Bem-vindo, {usuario.nome}</h2>

      <form onSubmit={adicionarTarefa} className="form-tarefa">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <input
          type="date"
          value={novaDataExpiracao}
          onChange={(e) => setNovaDataExpiracao(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {carregando ? (
        <p className="carregando">Carregando tarefas...</p>
      ) : (
        <ul className="lista-tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa._id} className={`tarefa-item ${tarefa.feita ? 'feita' : ''}`}>
              {tarefa.editando ? (
                <div className="tarefa-editando">
                  <input
                    type="text"
                    value={tarefa.texto}
                    onChange={(e) => {
                      const novas = [...tarefas];
                      novas[index].texto = e.target.value;
                      setTarefas(novas);
                    }}
                  />
                  <input
                    type="date"
                    value={tarefa.dataExpiracao?.substring(0, 10) || ''}
                    onChange={(e) => {
                      const novas = [...tarefas];
                      novas[index].dataExpiracao = e.target.value;
                      setTarefas(novas);
                    }}
                  />
                  <div className="botoes-edicao">
                    <button onClick={() => salvarEdicao(tarefa._id, index)}>Salvar</button>
                    <button onClick={() => cancelarEdicao(index)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="tarefa-visual">
                  <input
                    type="checkbox"
                    checked={tarefa.feita}
                    onChange={() => alternarTarefa(tarefa._id, tarefa.feita)}
                  />
                  <span className="texto-tarefa">{tarefa.texto}</span>
                  <div className="info-tarefa">
                    <small>
                      Criada em: {tarefa.createdAt?.substring(0, 10)} | Expira em: {tarefa.dataExpiracao ? tarefa.dataExpiracao.substring(0, 10) : '—'}
                    </small>
                  </div>
                  <div className="botoes-acao">
                    <button onClick={() => iniciarEdicao(index)}>Editar</button>
                    <button onClick={() => removerTarefa(tarefa._id)}>Remover</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
