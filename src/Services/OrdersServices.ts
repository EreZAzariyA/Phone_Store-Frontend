import axios from "axios";
import OrderModel from "../Models/order-model";
import config from "../Utils/Config";
import store from "../Redux/Store";
import {
  fetchAllOrdersAction,
  fetchGuestOrdersAction,
  fetchUserOrdersAction,
  setNewOrderAction,
  updateOrderStatusAction
} from "../Redux/slicers/orders-slicer";

class OrdersServices {
  async setNewOrder(order: OrderModel): Promise<OrderModel> {
    const response = await axios.post<OrderModel>(config.urls.orders.newOrder, order);
    const newOrder = response.data;
    store.dispatch(setNewOrderAction(newOrder));
    return newOrder;
  };

  async getUserOrders(userEmail: string): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(config.urls.orders.getUsersOrders + userEmail);
    const userOrders = response.data;
    store.dispatch(fetchUserOrdersAction(userOrders));
    return userOrders;
  };

  async getGuestsOrders(): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(config.urls.orders.getGuestsOrder);
    const guestOrders = response.data;
    store.dispatch(fetchGuestOrdersAction(guestOrders));
    return guestOrders;
  };

  async getAllOrders(): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(config.urls.orders.getAllOrders);
    const orders = response.data;
    store.dispatch(fetchAllOrdersAction(orders));
    return orders;
  };

  async getOrderDetail(orderId: string): Promise<OrderModel> {
    const response = await axios.get<OrderModel>(config.urls.orders.getOrderDetail + orderId);
    return response.data;
  };

  async updateOrderStatus(orderId: string, status: string): Promise<OrderModel> {
    const response = await axios.put<OrderModel>(config.urls.orders.updateStatus + orderId, { status });
    const updatedOrder = response.data;
    store.dispatch(updateOrderStatusAction(updatedOrder));
    return updatedOrder;
  };
};

const ordersServices = new OrdersServices();
export default ordersServices;
