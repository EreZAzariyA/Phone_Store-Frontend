import { createStore } from "redux";
import { authReducer } from "./AuthState";


export const authStore = createStore(authReducer);
