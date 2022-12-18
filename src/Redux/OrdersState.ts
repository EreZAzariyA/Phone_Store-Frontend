import OrderModel from "../Models/order-model";


export class OrdersState {
      orders: OrderModel[] = [];

      constructor() {
            const orders = localStorage.getItem('orders');
            if (orders) {
                  this.orders = JSON.parse(orders);
            }
      }
}

export enum OrdersActionType {
      FetchUserOrders = "FetchUsersOrders",
      FetchGuestOrders = "FetchGuestsOrders",
      setNewOrder = "setNewOrder",
      RemoveUserOrders = "RemoveUserOrders"
}
export interface OrdersAction {
      type: OrdersActionType;
      payload?: any;
}

export function fetchUserOrdersAction(userOrders: OrderModel[]): OrdersAction {
      return { type: OrdersActionType.FetchUserOrders, payload: userOrders };
};
export function fetchGuestsOrdersAction(guestsOrders: OrderModel[]): OrdersAction {
      return { type: OrdersActionType.FetchGuestOrders, payload: guestsOrders };
};
export function setNewOrderAction(order: OrderModel): OrdersAction {
      return { type: OrdersActionType.setNewOrder, payload: order };
}
export function removeUserOrders(): OrdersAction {
      return { type: OrdersActionType.RemoveUserOrders };
}

export function ordersReducer(currentOrdersState: OrdersState = new OrdersState(), action: OrdersAction): OrdersState {
      const newOrdersState = { ...currentOrdersState };

      switch (action.type) {
            case OrdersActionType.FetchUserOrders:
                  newOrdersState.orders = action.payload;
                  localStorage.setItem('orders', JSON.stringify(newOrdersState.orders));
                  break;

            case OrdersActionType.FetchGuestOrders:
                  newOrdersState.orders = action.payload;
                  localStorage.setItem('orders', JSON.stringify(newOrdersState.orders));
                  break;

            case OrdersActionType.setNewOrder:
                  newOrdersState.orders.push(action.payload);
                  localStorage.setItem('orders', JSON.stringify(newOrdersState.orders));
                  break;

            // case OrdersActionType.RemoveUserOrders:
            //       newOrdersState.orders = [];
            //       localStorage.removeItem('orders');
            //       break;

      }

      return newOrdersState
}