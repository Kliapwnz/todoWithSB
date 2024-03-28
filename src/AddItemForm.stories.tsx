import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions"

export default {
   title:"AddItemForm Components",
   component: AddItemForm
}
const callback = action("Button 'add' was pressed inside the forms")
export const AddItemFormBaseExample = (props:any) => {
   return <AddItemForm addItem={callback}/>
}