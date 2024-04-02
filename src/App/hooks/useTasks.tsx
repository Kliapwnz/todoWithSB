import {useState} from "react";
import {todolistID1, todolistID2} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";

export function useTasks() {
   let [tasks, setTasks] = useState<TasksStateType>({
      [todolistID1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'ReactJS', isDone: false},

      ],
      [todolistID2]: [
         {id: v1(), title: 'Rest API', isDone: true},
         {id: v1(), title: 'GraphQL', isDone: false},
      ]
   })
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
   const updateTask = (todolistId: string, taskId: string, title: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: title} : el)})
   }
   const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
      let todolistTasks = tasks[todolistID]
      let task = todolistTasks.find(el => el.id === id)
      if (task) {
         task.isDone = isDone
         setTasks({...tasks})
      }
   }
   return {
      tasks,
      setTasks,
      addTask,
      removeTask,
      updateTask,
      changeTaskStatus
   }
}
