import React, {ChangeEvent, useState} from "react";



export const useAddItemFrom = (addItem: (title: string) => void) => {
   let [title, setTitle] = useState("")
   let [error, setError] = useState<string | null>(null)
   let addTaskHandler = () => {
      if (title.trim() !== "") {
         addItem(title)
         setTitle("")
      } else {
         setError("Title is required")
      }
   }
   let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   let onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.key === "Enter") {
         addTaskHandler()
      }
   }

   return {
      title,
      error,
      onChangeHandler,
      onEnterHandler,
      addTaskHandler
   }
}