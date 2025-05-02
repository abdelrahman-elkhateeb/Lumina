import { createSlice } from '@reduxjs/toolkit';

const secs_per_question = 30;

const initialState = {
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
}

const takePlacementTestSlice = createSlice({
  name: "takePlacementTest",
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      const totalQuestions = action.payload;
      state.status = "active",
        state.secondsRemaining = totalQuestions * secs_per_question;
    },
    newAnswer: (state, action) => {
      const { answer, correctOption } = action.payload;
      state.answer = answer;
      if (answer === correctOption) state.points += 10;
    },
    nextQuestion: (state) => {
      state.index += 1;
      state.answer = null;
    },
    resetQuiz: (state) => {
      state.status = 'loading';
      state.index = 0;
      state.answer = null;
      state.points = 0;
      state.secondsRemaining = null;
    },
    finishQuiz: (state) => {
      state.status = "finished";
    },
    tick: (state) => {
      if (state.secondsRemaining > 0) {
        state.secondsRemaining -= 1;
      } else {
        state.status = 'finished';
      }
    },
  }
});

export const {
  startQuiz,
  newAnswer,
  nextQuestion,
  finishQuiz,
  resetQuiz,
  tick,
} = takePlacementTestSlice.actions;

export default takePlacementTestSlice.reducer;