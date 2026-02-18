import { createSlice } from "@reduxjs/toolkit";
import OrderModel from "../../Models/order-model";

interface OrdersInitialState {
  userOrders: OrderModel[];
  guestOrders: OrderModel[];
  allOrders: OrderModel[];
}

const initialState: OrdersInitialState = {
  userOrders: [],
  guestOrders: [],
  allOrders: [],
};

const ordersSlicer = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchUserOrdersAction(state, action) {
      state.userOrders = action.payload;
      return state;
    },
    fetchGuestOrdersAction(state, action) {
      state.guestOrders = action.payload;
      return state;
    },
    fetchAllOrdersAction(state, action) {
      state.allOrders = action.payload;
      return state;
    },
    setNewOrderAction(state, action) {
      state.userOrders.push(action.payload);
      return state;
    },
    updateOrderStatusAction(state, action) {
      const updatedOrder = action.payload;
      const allIdx = state.allOrders.findIndex(o => o.orderId === updatedOrder.orderId);
      if (allIdx !== -1) state.allOrders[allIdx] = updatedOrder;
      const userIdx = state.userOrders.findIndex(o => o.orderId === updatedOrder.orderId);
      if (userIdx !== -1) state.userOrders[userIdx] = updatedOrder;
      const guestIdx = state.guestOrders.findIndex(o => o.orderId === updatedOrder.orderId);
      if (guestIdx !== -1) state.guestOrders[guestIdx] = updatedOrder;
      return state;
    },
    removeUserOrdersAction(state) {
      state.userOrders = [];
      return state;
    },
  },
});

export const {
  fetchUserOrdersAction,
  fetchGuestOrdersAction,
  fetchAllOrdersAction,
  setNewOrderAction,
  updateOrderStatusAction,
  removeUserOrdersAction,
} = ordersSlicer.actions;

export default ordersSlicer;
