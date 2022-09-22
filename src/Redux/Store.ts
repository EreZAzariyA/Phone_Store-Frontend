import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { storeReducer } from "./StoreState";


export const authStore = createStore(authReducer);
export const store = createStore(storeReducer);