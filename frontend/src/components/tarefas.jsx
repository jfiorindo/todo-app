import { useState } from 'react';
import '../styles/tarefas.css';

export default function Tarefas({ usuario }) {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;
    setTarefas([...tarefas, { texto: novaTarefa, feita: false }]);
    setNovaTarefa('');
  };

  const alternarTarefa = (index) => {
    const novas = [...tarefas];
    novas[index].feita = !novas[index].feita;
    setTarefas(novas);
  };

  const removerTarefa = (index) => {
    const novas = tarefas.filter((_, i) => i !== index);
    setTarefas(novas);
  };

  return (
    <div className="tarefas-container">
      <h2>Bem-vindo, {usuario.nome}</h2>

      <form onSubmit={adicionarTarefa} className="form-tarefa">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} className={tarefa.feita ? 'feita' : ''}>
            <span onClick={() => alternarTarefa(index)}>{tarefa.texto}</span>
            <button onClick={() => removerTarefa(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
