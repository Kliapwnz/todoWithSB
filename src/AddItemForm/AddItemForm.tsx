import React, {ChangeEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemFrom} from "./hooks/useAddItemFrom";

type AddItemFormPropsType = {
   addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
   const {
      title,
      onChangeHandler,
      onEnterHandler,
      error,
      addTaskHandler
   } = useAddItemFrom(props.addItem)
   return (
      <div>
         <TextField
            size='small'
            variant='outlined'
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onEnterHandler}
            error={!!error}
            label='Title'
            helperText={error}
         />
         <IconButton
            color='primary'
            onClick={addTaskHandler}
         >
            <AddBox/>
         </IconButton>

      </div>
   );
});

