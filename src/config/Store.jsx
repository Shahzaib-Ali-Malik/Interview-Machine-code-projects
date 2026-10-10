import { configureStore } from "@reduxjs/toolkit";
import sharedReducer from '../Shared/state/SharedSlice'
import addQuestionReducer from '../features/addButton/state/AddQuestionSlice'

export const Store = configureStore({
    reducer:{
        shared : sharedReducer,
        addQuestion: addQuestionReducer
    }
})