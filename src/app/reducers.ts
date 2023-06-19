import { combineReducers } from "redux";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo_01/reducers";
import todoSlice from "../features/todo_02/todoSlice";
import todoGetData from "../features/todo_getdata/reducer";
import todoJsonSlice from "../features/todo_jsonserver/todoJsonSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  todo_01: todoReducer,
  todo_02: todoSlice,
  todo_getdata: todoGetData,
  todo_json: todoJsonSlice,
});
