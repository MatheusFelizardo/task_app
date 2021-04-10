<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $tasks = Task::all();
       return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $body = $request->all();
        $task = Task::create($body);

        return $task;
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Task $tarefa
     * @return \Illuminate\Http\Response
     */
    public function show(Task $tarefa)
    {       
        return $tarefa;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $tarefa)
    {   
        $body = $request->all();
        $tarefa->update($body);

        return $tarefa;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Task::find($id)){
            Task::destroy($id);
            return response()->json(["message"=> "Tarefa excluída com sucesso."], 200);
        }

        return response()->json(["message"=> "Tarefa não encontrada."], 404);

    }
}
