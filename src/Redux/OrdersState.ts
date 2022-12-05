import OrderModel from "../Models/order-model";


export class OrdersState {
      userOrders: OrderModel[] = null;
      guestOrders: OrderModel[] = null;

      // constructor() {
      //       const orders = localStorage.getItem('orders');
      //       if (orders) {
      //             this.userOrders = JSON.parse(userOrders);
      //       } else {
      //             const guestsOrders = localStorage.getItem('guest-orders');
      //             if (guestsOrders) {
      //                   this.guestOrders = JSON.parse(guestsOrders);
      //             }
      //       }
      // }
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
                  newOrdersState.userOrders = action.payload;
                  localStorage.setItem('orders', JSON.stringify(newOrdersState.userOrders));
                  break;

            case OrdersActionType.FetchGuestOrders:
                  newOrdersState.guestOrders = action.payload;
                  localStorage.setItem('orders', JSON.stringify(newOrdersState.guestOrders));
                  break;

            // case OrdersActionType.setNewOrder:
            //       newOrdersState.orders.push(action.payload);
            //       localStorage.setItem('orders', JSON.stringify(newOrdersState.orders));
            //       break;

            case OrdersActionType.RemoveUserOrders:
                  newOrdersState.userOrders = null;
                  localStorage.removeItem('user-orders');

      }

      return newOrdersState
}