import {action} from "@storybook/addon-actions"
import React from "react";
import {AppWithRedux} from "./AppWithRedux";

export default {
   title: "AppWithRedux Component",
   component: AppWithRedux
}

export const AppWithReduxBaseExample = () => {
   return <AppWithRedux/>
}