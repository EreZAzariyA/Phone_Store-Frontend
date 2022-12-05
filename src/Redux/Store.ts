import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { guestsReducer } from "./GuestState";
import { ordersReducer } from "./OrdersState";
import { shoppingCartReducer } from "./ShoppingCartState";
import { storeReducer } from "./StoreState";


export const authStore = createStore(authReducer);
export const store = createStore(storeReducer);
export const shoppingCartStore = createStore(shoppingCartReducer);
export const guestsStore = createStore(guestsReducer);
export const ordersStore = createStore(ordersReducer);