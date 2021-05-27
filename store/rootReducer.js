import { combineReducers } from "redux";
import mainPageReducer from "../reducers/mainPageReducer";

const rootReducer = combineReducers({
  mainPageReducer,
});

export default rootReducer;
