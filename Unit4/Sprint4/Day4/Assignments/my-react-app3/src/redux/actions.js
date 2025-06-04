import { ADD_BOOK, DELETE_BOOK, EDIT_BOOK, TOGGLE_READ_STATUS, SET_FILTER } from "./actionTypes";

export const addBook = (book) => ({ type: ADD_BOOK, payload: book });
export const deleteBook = (id) => ({ type: DELETE_BOOK, payload: id });
export const editBook = (book) => ({ type: EDIT_BOOK, payload: book });
export const toggleReadStatus = (id) => ({ type: TOGGLE_READ_STATUS, payload: id });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
