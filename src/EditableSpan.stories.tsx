import {action} from "@storybook/addon-actions"
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
   title: "EditableSpan Component",
   component: EditableSpan
}
const changeTaskStatusCallback = action("Status changed")


export const EditableSpanBaseExample = () => {
   return <>

   </>
}