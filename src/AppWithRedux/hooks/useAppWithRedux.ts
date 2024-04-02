import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {useCallback} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {
   AddTodolistAC,
   ChangeTodolistFilterAC,
   ChangeTodolistTitleAC,
   RemoveTodolistAC
} from "../../state/todolists-reducer";
import {FilterValuesType, TasksStateType, TodolistsType} from "../AppWithRedux";

export const useAppWithRedux = () => {
   const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

   const dispatch = useDispatch()
   const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistID: string) => {
      dispatch(changeTaskStatusAC(id, isDone, todolistID))
   }, [dispatch])
   const addTask = useCallback((title: string, todolistID: string) => {
      dispatch(addTaskAC(title, todolistID))
   }, [dispatch])
   const removeTask = useCallback((taskId: string, todolistID: string) => {
      dispatch(removeTaskAC(taskId, todolistID))
   }, [dispatch])
   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      dispatch(ChangeTodolistFilterAC(todolistId, value))
   }, [dispatch])
   const removeTodolist = useCallback((id: string) => {
      dispatch(RemoveTodolistAC(id))
   }, [dispatch])
   const addTodolist = useCallback((title: string) => {
      dispatch(AddTodolistAC(title))
   }, [dispatch])
   const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
      dispatch(changeTaskTitleAC(taskId, title, todolistId))
   }, [dispatch])
   const updateTodolist = useCallback((todolistId: string, title: string) => {
      dispatch(ChangeTodolistTitleAC(todolistId, title))
   }, [dispatch])

   return {
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
   }
}