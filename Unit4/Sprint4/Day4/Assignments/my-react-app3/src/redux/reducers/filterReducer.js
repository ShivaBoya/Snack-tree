import { SET_FILTER } from "../actionTypes";

const initialState = {
  author: "",
  genre: "",
  status: "", // "read" | "unread" | ""
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default filterReducer;
