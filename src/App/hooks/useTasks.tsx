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
   return [tasks, setTasks] as const
}