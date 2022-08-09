import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import tasksReducer from "./tasks.reducer";

const reducers = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;