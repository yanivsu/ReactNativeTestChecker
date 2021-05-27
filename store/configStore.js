import rootReducer from "../store/rootReducer";
import { createStore } from "redux";

export default function configureStore() {
  return createStore(rootReducer);
}
