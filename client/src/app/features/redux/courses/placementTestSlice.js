import { createSlice } from "@reduxjs/toolkit";

const placementTestSlice = createSlice({
  name: "placementTest",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      const { questionText } = action.payload;
      state.questions.push({
        question: questionText,
        options: [],
        correctOption: null
      });
    },
    addOption: (state, action) => {
      const { questionIndex, optionText } = action.payload;
      state.questions[questionIndex]?.options.push(optionText);
    },
    removeOption: (state, action) => {
      const { questionIndex, optionIndex } = action.payload;
      const question = state.questions[questionIndex];
      if (question) {
        question.options = question.options.filter((_, idx) => idx !== optionIndex);

        if (question.correctOption === optionIndex) {
          question.correctOption = null;
        } else if (question.correctOption > optionIndex) {
          question.correctOption -= 1;
        }
      }
    },
    setCorrectOption: (state, action) => {
      const { questionIndex, correctOptionIndex } = action.payload;
      if (state.questions[questionIndex]) {
        state.questions[questionIndex].correctOption = correctOptionIndex;
      }
    },
  }
})

export const {
  addQuestion,
  addOption,
  removeOption,
  setCorrectOption,
} = placementTestSlice.actions;

export default placementTestSlice.reducer;