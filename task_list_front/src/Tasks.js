import React from 'react'
import concluirIcon from './assets/thumbs-up-solid.svg'
import desfazerConcluidoIcon from './assets/thumbs-down-solid.svg'
import deleteIcon from './assets/trash-solid.svg'
import saveIcon from './assets/save-duotone.svg'
import editIcon from './assets/edit-solid.svg'
import loadIcon from './assets/spinner-solid.svg'
import closeIcon from './assets/times-square-solid.svg'

const Tasks = () => {

    const [preloadedTask, setPreloadedTask] = React.useState('')
    const [newTask, setNewTask ] = React.useState(false)
    const [update, setUpdate ] = React.useState(false)
    const [titulo, setTitulo] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [editedTitle, setEditedTitulo] = React.useState('')
    const [editedId, setEditedId] = React.useState('')
    const [editedDescription, setEditedDescription] = React.useState('')
    const [alertMsg, setAlertMsg] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)

    async function getData() {
        const response = await fetch('http://localhost:8000/api/tarefa');
        const data = await response.json()
        setPreloadedTask(data)
    }

    React.useEffect( ()=> {
        getData()
        setLoading(false);
    },[])

    React.useEffect( ()=> {
        getData()
        setNewTask(false)
        setTitulo("")
        setDescricao("")
        setLoading(false);
    },[newTask])

    React.useEffect( ()=> {
        getData()
        setUpdate(false)
        setLoading(false);
    },[update])

    React.useEffect( ()=> {
        setLoading(false);
        
    },[editedId, editedTitle, editedDescription])

    async function saveNewTask () {
        if (titulo !== "" && descricao !== "") {
            setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    titulo,
                    descricao
                })
            };
            await fetch('http://localhost:8000/api/tarefa', requestOptions);
            setNewTask(true)
        }
        if (titulo === "" || descricao === "" ) {
            setAlertMsg('Favor preencher ambos os campos.')
        }
    }

    async function concludeTask (id) {
        setLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "status": "Concluída"
            })
        };
        await fetch(`http://localhost:8000/api/tarefa/${id}`, requestOptions);
        setUpdate(true)
    }

    async function saveEditedTask(id) {
        setEditModal(false)
        setLoading(true)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "titulo": editedTitle,
                "descricao": editedDescription
            })
        };
        await fetch(`http://localhost:8000/api/tarefa/${id}`, requestOptions);
        
        setUpdate(true)
    }

    async function unconcludeTask (id) {
        setLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "status": "Em aberto"
            })
        };
        await fetch(`http://localhost:8000/api/tarefa/${id}`, requestOptions);
        setUpdate(true)
    }

    async function findTask (id) {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/tarefa/${id}`);
        const data = await response.json()
        
        setEditedId(data.id);
        setEditedTitulo(data.titulo)
        setEditedDescription(data.descricao)
        
        setEditModal(true);
    }

    async function deleteTask (id) {
        setLoading(true);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "status": "Concluída"
            })
        };
        await fetch(`http://localhost:8000/api/tarefa/${id}`, requestOptions);
        setUpdate(true)
    }

    return (
        <div className="flex flex-col gap-1">
            
            <div className="flex flex-col gap-1 border-b-2 pb-1 border-green-500 pb-4">
                <div className="grid grid-cols-custom items-center content-center gap-2">
                    <div className="p-1" >Nova tarefa</div>
                    <div className="p-1">Descrição</div>  
                    <div className="p-1"></div> 
                    <div className="p-1 flex items-center justify-center"></div>  
                </div>
                    <form className=" w-full grid grid-cols-new items-center content-center gap-2" action="post">
                        <input 
                        onChange={(e)=>{setTitulo(e.target.value); setAlertMsg("")}}
                        value={titulo}
                        className=" outline-none border-2 rounded-md p-1 border-green-500" 
                        placeholder="Estudar..." type="text"/>

                        <input 
                        onChange={(e)=>{setDescricao(e.target.value); setAlertMsg("")}}
                        value={descricao}
                        className=" outline-none border-2 rounded-md p-1 border-green-500" placeholder="Tarefa onde terei que..." type="text"/>
                        
                        <div className="flex items-center justify-center" onClick={saveNewTask}>
                            <img className="w-1/2 text-red-600 cursor-pointer" src={saveIcon} alt="Deletar tarefa"/>
                        </div>
                    </form>
                    {alertMsg && <span className="text-red-600">{alertMsg}</span> }
            </div>
            
            <div className="grid grid-cols-custom items-center content-center gap-2 border-b-2 border-green-500 pb-1">
                <div className="p-1" >Tarefas</div>
                <div className="p-1">Descrição</div>  
                <div className="p-1">Status</div> 
                <div className="p-1">Ação</div>  
            </div>

            {preloadedTask && preloadedTask.map((task)=> {
                return (
                
                <div key={task.id} className="grid grid-cols-custom items-center content-center gap-2 pb-2 border-b-2 border-green-200">
                    <div className="rounded-md p-1 ">{task.titulo}</div>
                    <div className="rounded-md p-1">{task.descricao}</div>   
                    <div className="rounded-md p-1">{task.status}</div>
                    <div className="flex gap-4">
                        <div>
                            {
                            task.status !== "Concluída" ? 
                            <img 
                            onClick={()=>{concludeTask(task.id)}}
                            className="w-full text-green-600 cursor-pointer" 
                            src={concluirIcon} 
                            alt="Concluir tarefa"
                            /> : 
                            <img 
                            onClick={()=>{unconcludeTask(task.id)}}
                            className="w-full text-green-600 cursor-pointer" 
                            src={desfazerConcluidoIcon} 
                            alt="Desconcluir tarefa"
                            />
                            }
                        </div>

                        <div>
                            <img 
                            onClick={()=>{findTask(task.id)}}
                            className="w-full text-red-600 cursor-pointer" 
                            src={editIcon} 
                            alt="Editar tarefa"/>
                        </div>

                        <div>
                            <img 
                            onClick={()=>{deleteTask(task.id)}}
                            className="w-full text-red-600 cursor-pointer" 
                            src={deleteIcon} 
                            alt="Deletar tarefa"/>
                        </div>

                    </div>             
                </div>
                
                )
            })
            }

            {loading && 
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <img className="w-5 mb-2 animate-spin" src={loadIcon} alt="Loading Icon"/>
                <span className="text-white">Carregando...</span> 
            </div>      
            }

            {editModal && 
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <div className="w-2/4 bg bg-white p-6 rounded-md relative">
                        <div className="flex items-center justify-center" 
                        onClick={()=> {setEditModal(false); setLoading(false)}}>
                            <img className="w-6 absolute right-3 text-red-600 cursor-pointer" src={closeIcon} alt="Fechar modal"/>
                        </div>
                    <h1 className="text-green-500 mb-2 font-semibold text-xl">Editar tarefa</h1>
                    
                    {<form className="grid grid-cols-new items-center content-center gap-2">
                        <input 
                        onChange={(e)=>{setEditedTitulo(e.target.value); setAlertMsg("")}}
                        value={editedTitle}
                        className=" outline-none border-2 rounded-md p-1 border-green-500" 
                        placeholder="Estudar..." type="text"/>

                        <input 
                        onChange={(e)=>{setEditedDescription(e.target.value); setAlertMsg("")}}
                        value={editedDescription}
                        className=" outline-none border-2 rounded-md p-1 border-green-500" placeholder="Tarefa onde terei que..." type="text"/>
                    
                        <div className="flex items-center justify-center" 
                        onClick={()=> {saveEditedTask(editedId)}}
                        >
                            <img className="w-1/2 text-red-600 cursor-pointer" src={saveIcon} alt="Salvar edição"/>
                        </div>
                    </form>
                    }
                </div>
            </div>  
            }
            
        </div>
    )
}

export default Tasks
