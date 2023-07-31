import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isFetching: false,
    error: false,
    
  },

  reducers: {
    // GET ALL

    getBooksStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    getBookSuccess: (state, action) => {
      state.isFetching = false;
      state.books = action.payload;
    },

    getBooksFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Increment Likes
    incrementLikes: (state, action) => {
      const bookId = action.payload;
      const bookIndex = state.books.findIndex((book) => book._id === bookId);
      if (bookIndex !== -1) {
        state.books[bookIndex].likes += 1;
      }
    },

    decrementLikes: (state, action) => {
      const bookId = action.payload;
      const bookIndex = state.books.findIndex((book) => book._id === bookId);
      if (bookIndex !== -1) {
        state.books[bookIndex].likes -= 1;
      }
    },
  },
});

export const {
  getBookSuccess,
  getBooksFailure,
  getBooksStart,
  incrementLikes,
  decrementLikes,
} = bookSlice.actions;
export default bookSlice.reducer;
