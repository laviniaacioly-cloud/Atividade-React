import "./App.css";
import Header from "./componentes/Header";
// import ListaTarefas from "./componentes/ListaTarefas";
import { useEffect, useState } from "react";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    //procura as tarefas salvas no navegador
    const salvo = localStorage.getItem("TaskFlow.tarefas");
    //transforma o  LocalStorage em array
    return salvo ? JSON.parse(salvo) : []; // se não existir começa com lista vazia
  });

  const [proximoId, setProximoId] = useState(() => {
    const salvo = localStorage.getItem("TaskFlow.tarefas");

    if (salvo) {
      const dados = JSON.parse(salvo);
      return dados.length > 0 ? dados[dados.length - 1].id + 1 : 1;
    }

    return 1;
  });

  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  useEffect(() => {
    localStorage.setItem("TaskFlow.tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (texto.trim() === "") return;

    const nova = {
      id: proximoId,
      texto: texto.trim(),
      concluida: false,
      prioridade: prioridade,
      coluna: "afazer",
    };

    setTarefas([...tarefas, nova]);
    setProximoId(proximoId + 1);
    setTexto("");
    setPrioridade("media");
  }

  function moverTarefa(id, novaColuna) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, coluna: novaColuna } : tarefa,
      ),
    );
  }
  function deletarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  // function concluirTarefa(id) {
  //   setTarefas(
  //     tarefas.map((tarefa) =>
  //       tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
  //     ),
  //   );
  // }

  return (
    <div className="conteiner">
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />

      <main>
        {/* Formulário */}
        <section id="formulario">
          <input
            id="input-tarefa"
            type="text"
            placeholder="Nova tarefa..."
            autoComplete="off"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
          />

          <select
            id="sel-prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          <button
            className="btn-adicionar"
            type="button"
            onClick={adicionarTarefa}
          >
            Adicionar
          </button>
        </section>

        {/* Kanban */}

        <section className="kanban">
          <section className="coluna">
            <h2>A Fazer</h2>
  {/* fazer essa coluna funcionar */}
            {tarefas
              .filter((tarefa) => tarefa.coluna === "afazer")
              .map((tarefa) => (
                <div key={tarefa.id} className="card">
                  <p>{tarefa.texto}</p>
                   <button onClick={() => moverTarefa(tarefa.id, "andamento")}>
                      →
                   </button>

                   <button onClick={() => deletarTarefa(tarefa.id)}>
                      🗑️
                   </button>
                </div>
              ))}
          </section>

          <section className="coluna">
            <h2>Em Andamento</h2>
  {/* fazer essa coluna funcionar */}
            {tarefas
            .filter((tarefa) => tarefa.coluna === "andamento")
            .map((tarefa) => (
              <div key={tarefa.id} className="card">
                <p>{tarefa.texto}</p>
{/* mover as tarefas */}
{/* esquerda */}
                <button onClick={() => moverTarefa(tarefa.id, "afazer")}>
                  ← 
                </button>
{/* direita */}
                <button onClick={() => moverTarefa(tarefa.id, "concluido")}>
                  →
                </button>

                  <button onClick={() => deletarTarefa(tarefa.id)}>
                      🗑️
                  </button>
              </div>
            ))}
          </section>

          <section className="coluna">
            <h2>Concluído</h2>
            
            {tarefas
              .filter((tarefa) => tarefa.coluna === "concluido")
              .map((tarefa) => (
                <div key={tarefa.id} className="card">
                  <p>{tarefa.texto}</p>

                  <button onClick={() => moverTarefa(tarefa.id, "andamento")}>
                    ←
                  </button>

                    <button onClick={() => deletarTarefa(tarefa.id)}>
                      🗑️
                    </button>
                </div>
              ))}
          </section>
          </section>
      </main>

      <footer>
        <p>TaskFlow 2026 - Prof. Alan Glei</p>
      </footer>
    </div>
  );
}

export default App;
