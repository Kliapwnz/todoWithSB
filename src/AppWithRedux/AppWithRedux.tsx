import React from 'react';
import '../App.css';
import {TaskType, Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {AppBarHelper} from "../AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useAppWithRedux} from "./hooks/useAppWithRedux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
   id: string,
   title: string,
   filter: FilterValuesType
}
export type TasksStateType = {
   [key: string]: Array<TaskType>
}

export function AppWithRedux() {

   const {
      todolists,
      tasks,
      changeTaskStatus,
      addTask,
      removeTask,
      changeFilter,
      removeTodolist,
      addTodolist,
      updateTask,
      updateTodolist
   } = useAppWithRedux()

   return (
      <div className="App">
         <AppBarHelper/>
         <Container fixed>
            <Grid container style={{padding: '20px'}}>
               <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
               {todolists.map(el => {
                  return <Grid item>
                     <Paper style={{padding: '10px'}}>
                        <Todolist title={el.title}
                                  removeTask={removeTask}
                                  task={tasks[el.id]}
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


