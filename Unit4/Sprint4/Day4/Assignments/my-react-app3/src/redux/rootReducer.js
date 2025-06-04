import { combineReducers } from "redux";
import bookReducer from "./reducers/bookReducer";
import filterReducer from "./reducers/filterReducer";

const rootReducer = combineReducers({
  books: bookReducer,
  filters: filterReducer,
});

export default rootReducer;
