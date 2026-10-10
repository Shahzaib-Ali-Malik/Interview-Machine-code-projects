import { createSlice } from "@reduxjs/toolkit";

const addQuestionSlice = createSlice({
  name: "addQuestion",
  initialState: {
    questions: JSON.parse(localStorage.getItem("allQuestions")) || [],
    editQuestion: null,
  },

  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setEditQuestion: (state, action) => {
      state.editQuestion = action.payload;
    },

  },
});

export const { setQuestions,setEditQuestion } = addQuestionSlice.actions;
export default addQuestionSlice.reducer;
