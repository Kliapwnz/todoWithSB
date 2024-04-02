import React from 'react';
import '../App.css';
import {TaskType, Todolist} from "../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm";
import {AppBarHelper} from "../AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
   id: string,
   title: string,
   filter: FilterValuesType
}
export type TasksStateType = {
   [key: string]: Array<TaskType>
}


function App() {

   const [todolists, setTodolists] = useTodolists()
   const {
      tasks,
      setTasks,
      addTask,
      removeTask,
      updateTask,
      changeTaskStatus
   } = useTasks()


   const changeFilter = (value: FilterValuesType, todolistId: string) => {
      let todolist = todolists.find(el => el.id === todolistId)
      if (todolist) {
         todolist.filter = value
         setTodolists([...todolists])
      }
   }
   const removeTodolist = (id: string) => {
      setTodolists(todolists.filter(el => el.id !== id))
      delete tasks[id]
      setTasks({...tasks})
   }
   const addTodolist = (title: string) => {
      let newTodolistId = v1()
      let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: "all"}
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasks, [newTodolistId]: []})
   }

   const updateTodolist = (todolistId: string, title: string) => {
      setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: title} : el))
   }

   return (
      <div className="App">
         <AppBarHelper/>
         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
               {todolists.map(el => {
                  let allTodolistsTasks = tasks[el.id]
                  let tasksForTodolist = allTodolistsTasks
                  if (el.filter === "active") {
                     tasksForTodolist = allTodolistsTasks.filter(el => el.isDone)
                  }
                  if (el.filter === "completed") {
                     tasksForTodolist = allTodolistsTasks.filter(el => !el.isDone)
                  }
                  return <Grid item>
                     <Paper style={{padding: '10px'}}>
                        <Todolist title={el.title}
                                  task={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  id={el.id}
                                  filter={el.filter}
                                  removeTodolist={removeTodolist}
                                  updateTask={updateTask}
                                  updateTodolist={updateTodolist}
                        />
                     </Paper>
                  </Grid>
               })}
            </Grid>
         </Container>
      </div>
   );
}

export default App;
