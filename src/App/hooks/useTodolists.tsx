import {useState} from "react";
import {todolistID1, todolistID2} from "../id-utils";
import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export function useTodolists(onTodolistRemoved: (id: string) => void,
                             onTodolistAdded: (id: string) => void) {
   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
      {id: todolistID1, title: 'KLIApwnz', filter: 'all'},
      {id: todolistID2, title: 'I try to learn JS', filter: 'all'},
   ])
   const changeFilter = (value: FilterValuesType, todolistId: string) => {
      let todolist = todolists.find(el => el.id === todolistId)
      if (todolist) {
         todolist.filter = value
         setTodolists([...todolists])
      }
   }
   const removeTodolist = (id: string) => {
      setTodolists(todolists.filter(el => el.id !== id))
      onTodolistRemoved(id)
   }
   const addTodolist = (title: string) => {
      let newTodolistId = v1()
      let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: "all"}
      setTodolists([newTodolist, ...todolists])
      onTodolistAdded(newTodolistId)

   }
   const updateTodolist = (todolistId: string, title: string) => {
      setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: title} : el))
   }

   return {
      todolists,
      changeFilter,
      removeTodolist,
      addTodolist,
      updateTodolist
   }
}