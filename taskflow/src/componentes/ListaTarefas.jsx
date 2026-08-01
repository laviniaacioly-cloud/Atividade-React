import TarefaItem from "./TarefaItem";

function ListaTarefas({ tarefas, onDeletar, onConcluir }) {
  return (
    <section id="lista-section">
      {tarefas.length === 0 && (
        <p className="msg-vazia">
          Nenhuma tarefa cadastrada. Adicione uma acima!
        </p>
      )}

      {tarefas.length > 0 && (
        <ul id="lista-tarefas">
          {tarefas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              texto={tarefa.texto}
              concluida={tarefa.concluida}
              prioridade={tarefa.prioridade}
              onDeletar={() => onDeletar(tarefa.id)}
              onConcluir={() => onConcluir(tarefa.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaTarefas;