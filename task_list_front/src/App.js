import Task from "./Tasks";

import concluirIcon from './assets/thumbs-up-solid.svg'
import desfazerConcluidoIcon from './assets/thumbs-down-solid.svg'
import deleteIcon from './assets/trash-solid.svg'
import saveIcon from './assets/save-duotone.svg'
import editIcon from './assets/edit-solid.svg'

function App() {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden h-9v=0vh w-full my-2">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-4xl mt-5 w-full">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-500 font-semibold text-xl">Task Manager </div>
          <p className="mt-2 text-gray-500">Bem vindo ao gerenciador feito para você organizar todas as suas tarefas.</p>
        </div>
      </div>      
    </div>

    <div className="w-full max-h-30rem max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-4xl mt-2 p-5 overflow-scroll">
        <div className="flex justify-between w-full border-b-2 pb-1 border-green-500">
        <h1 className="fs-20 font-semibold text-gray-500 mb-2 text-xl text-green-500">Lista de Tarefas</h1>

        <div className="flex gap-2 border-l-2 pl-2">
          <div className="IconsLegend flex flex-col justify-center items-center">
            <img className="w-4 h-5" src={concluirIcon} alt="Concluir Tarefa"/>
            <span className="text-xs">Concluir tarefa</span>
          </div>

          <div className="IconsLegend flex flex-col justify-center items-center">
            <img className="w-4 h-5" src={desfazerConcluidoIcon} alt="Desfazer conclusão da tarefa"/>
            <span className="text-xs">Desfazer conclusão da tarefa</span>
          </div>

          <div className="IconsLegend flex flex-col justify-center items-center">
            <img className="w-4 h-5" src={editIcon} alt="Deletar Tarefa"/>
            <span className="text-xs">Editar tarefa</span>
          </div>

          <div className="IconsLegend flex flex-col justify-center items-center">
            <img className="w-4 h-5" src={deleteIcon} alt="Deletar Tarefa"/>
            <span className="text-xs">Deletar tarefa</span>
          </div>

          <div className="IconsLegend flex flex-col justify-center items-center">
            <img className="w-4 h-5" src={saveIcon} alt="Concluir Tarefa"/>
            <span className="text-xs">Salvar nova tarefa</span>
          </div>
        </div>

        </div>
        <Task />
      </div>
    </div>
  );
}

export default App;
