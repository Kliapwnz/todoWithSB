import React from 'react';
import '../App.css';
import {TaskType, Todolist} from "../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm";
import {AppBarHelper} from "../AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useTodolists} from "./hooks/UseTodolists";
import {useTasks} from "./hooks/UseTasks";

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
   const [tasks, setTasks] = useTasks()


   const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
      let todolistTasks = tasks[todolistID]
      let task = todolistTasks.find(el => el.id === id)
      if (task) {
         task.isDone = isDone
         setTasks({...tasks})
      }
   }

   const addTask = (title: string, todolistID: string) => {
      let task = {id: v1(), title: title, isDone: false}
      let todolistTasks = tasks[todolistID]
      tasks[todolistID] = [task, ...todolistTasks]
      setTasks({...tasks})

   }

   const removeTask = (taskId: string, todolistID: string) => {
      let todolistTasks = tasks[todolistID]
      tasks[todolistID] = todolistTasks.filter(el => el.id !== taskId)
      setTasks({...tasks})
   }

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
   const updateTask = (todolistId: string, taskId: string, title: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: title} : el)})
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
