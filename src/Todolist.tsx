import React, {memo, useCallback} from "react";
import {FilterValuesType} from "./App/App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

type TodolistType = {
   title: string
   task: TaskType[]
   removeTask: (taskId: string, todolistID: string) => void
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistID: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
   id: string
   filter: FilterValuesType
   removeTodolist: (id: string) => void
   updateTask: (todolistId: string, taskId: string, title: string) => void
   updateTodolist: (todolistId: string, title: string) => void
}
export type TaskType = {
   id: string,
   title: string,
   isDone: boolean
}


export const Todolist = memo((props: TodolistType) => {
   console.log("todo")

   const addTask = useCallback((title: string) => {
      props.addTask(title, props.id)
   }, [props.addTask, props.id])

   let allButtonHandler = useCallback(() => {
      props.changeFilter("all", props.id)
   }, [props.changeFilter, props.id])
   let activeButtonHandler = useCallback(() => {
      props.changeFilter("active", props.id)
   }, [props.changeFilter, props.id])
   let completedButtonHandler = useCallback(() => {
      props.changeFilter("completed", props.id)
   }, [props.changeFilter, props.id])
   let updateTodolistHandler = useCallback((title: string) => {
      props.updateTodolist(props.id, title)
   }, [props.id, props.updateTodolist])
   const updateTaskHandler = useCallback((tId: string, title: string) => {
      props.updateTask(props.id, tId, title)
   },[props.id, props.updateTask])
   const removeTodolist = () => {
      props.removeTodolist(props.id)
   }

   let tasksForTodolist = props.task
   if (props.filter === "active") {
      tasksForTodolist = props.task.filter(el => !el.isDone)
   }
   if (props.filter === "completed") {
      tasksForTodolist = props.task.filter(el => el.isDone)
   }

   return (
      <div>
         <EditableSpan title={props.title} onClick={updateTodolistHandler}/>
         <IconButton onClick={removeTodolist}>
            <Delete/>
         </IconButton>
         <div>
            <AddItemForm addItem={addTask}/>
         </div>
         <ul>
            {tasksForTodolist.map(el => <Task
                  key={el.id}
                  removeTask={props.removeTask}
                  changeTaskStatus={props.changeTaskStatus}
                  task={el} todolistId={props.id}
                  updateTaskHandler={updateTaskHandler}
               />
            )}
         </ul>
         <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={allButtonHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={activeButtonHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={completedButtonHandler}>Completed
            </Button>
         </div>
      </div>
   )
})

