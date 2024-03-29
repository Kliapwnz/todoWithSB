import {action} from "@storybook/addon-actions"
import {Task} from "./Task";
import React from "react";

export default {
   title: "Task Component",
   component: Task
}
const changeTaskStatusCallback = action("Status changed")
const removeTaskCallback = action("Task removed")
const updateTaskHandlerCallback = action("Task renamed")


export const TaskBaseExample = () => {
   return <>
      <Task
         removeTask={removeTaskCallback}
         changeTaskStatus={changeTaskStatusCallback}
         task={{id:"1", isDone: true, title:"CSS"}}
         todolistId={"todolistId1"}
         updateTaskHandler={updateTaskHandlerCallback}
      />
      <Task
         removeTask={removeTaskCallback}
         changeTaskStatus={changeTaskStatusCallback}
         task={{id:"2", isDone: false, title:"JS"}}
         todolistId={"todolistId2"}
         updateTaskHandler={updateTaskHandlerCallback}
      />
   </>
}