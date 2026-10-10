import { createSlice } from "@reduxjs/toolkit";

const SharedSlice = createSlice({
    name: "shared",
    initialState: {
        isOpen: false
    },

    reducers: {
        setIsOpen : (state,action)=>{
            state.isOpen = action.payload
        }
    }
})

export const {setIsOpen} = SharedSlice.actions;

export default SharedSlice.reducer