import {useState} from "react";
import {todolistID1, todolistID2} from "../id-utils";
import {TodolistsType} from "../App";

export function useTodolists() {
   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
      {id: todolistID1, title: 'KLIApwnz', filter: 'all'},
      {id: todolistID2, title: 'I try to learn JS', filter: 'all'},
   ])
   return [todolists, setTodolists] as const
}