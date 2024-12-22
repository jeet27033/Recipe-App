import { MyReducer } from "./reducer";
import { createStore } from "redux";

export const store = createStore(MyReducer);