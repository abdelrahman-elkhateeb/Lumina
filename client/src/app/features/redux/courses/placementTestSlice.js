import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: '',
  options: [],
  correctOption: '',
  isLoading: false,
  error: null
};

const placementTestSlice = createSlice({
  name: 'placementTest',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setCorrectOption: (state, action) => {
      state.correctOption = action.payload;
    },
    resetQuestion: (state) => {
      state.question = '';
      state.options = [];
      state.correctOption = '';
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  setQuestion,
  setOptions,
  setCorrectOption,
  resetQuestion,
  setLoading
} = placementTestSlice.actions;
export default placementTestSlice.reducer;