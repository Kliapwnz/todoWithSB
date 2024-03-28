import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
   removeTask: (taskId: string, todolistID: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
   task: TaskType
   todolistId: string
   updateTaskHandler: (tId: string, title: string) => void
}
export const Task = (props: TaskPropsType) => {
   let onChangeBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
   }
   let removeTaskHandler = () => {
      props.removeTask(props.task.id, props.todolistId)
   }
   return (
      <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
         <Checkbox
            color='primary'
            checked={props.task.isDone}
            onChange={onChangeBoxHandler}
         />
         <EditableSpan title={props.task.title} onClick={(title) => props.updateTaskHandler(props.task.id, title)}/>
         <IconButton onClick={removeTaskHandler}>
            <Delete/>
         </IconButton>
      </li>
   )
}