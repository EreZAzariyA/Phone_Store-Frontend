import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { shoppingCartReducer } from "./ShoppingCartState";
import { storeReducer } from "./StoreState";


export const authStore = createStore(authReducer);
export const store = createStore(storeReducer);
export const shoppingCartStore = createStore(shoppingCartReducer);