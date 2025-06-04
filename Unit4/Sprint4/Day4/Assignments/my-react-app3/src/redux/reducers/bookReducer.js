import { ADD_BOOK, DELETE_BOOK, EDIT_BOOK, TOGGLE_READ_STATUS } from "../actionTypes";

const initialState = [];

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload } : book
      );
    case TOGGLE_READ_STATUS:
      return state.map((book) =>
        book.id === action.payload ? { ...book, status: !book.status } : book
      );
    default:
      return state;
  }
};

export default bookReducer;
