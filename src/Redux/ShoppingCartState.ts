import ItemInCartModel from "../Models/item-in-cart model";
import { PhoneModel } from "../Models/phone-model";
import ShoppingCartModel from "../Models/shopping-cart model";


export class ShoppingCartState {
      public shoppingCart: ShoppingCartModel = null;
      public itemsInCart: ItemInCartModel[] = null;

      constructor() {
            const cart = localStorage.getItem("shopping_cart");
            if (cart) {
                  this.shoppingCart = JSON.parse(cart);

                  const items = localStorage.getItem("items_in_cart");
                  if (items) {
                        this.itemsInCart = JSON.parse(items);
                  }
            }
      }
};

export enum ShoppingCartActionType {
      FetchShoppingCart = "FetchShoppingCart",
      FetchItemsFromCart = "FetchItemsFromCart",
      AddItemToCart = "AddItemToCart",
      Logout = "Logout"
};
export interface ShoppingCartAction {
      type: ShoppingCartActionType;
      payload?: any;
};

export function fetchShoppingCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchShoppingCart, payload: shoppingCart };
};
export function fetchItemsFromShoppingCartAction(itemsInCart: ItemInCartModel[]): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchItemsFromCart, payload: itemsInCart };
};
export function addItemToCartAction(itemToAdd: ItemInCartModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.AddItemToCart, payload: itemToAdd };
}
export function shoppingCartLogoutAction(): ShoppingCartAction {
      return { type: ShoppingCartActionType.Logout };
}


export function shoppingCartReducer(currentShoppingCartState: ShoppingCartState = new ShoppingCartState(), action: ShoppingCartAction): ShoppingCartState {

      const newCartState = { ...currentShoppingCartState };

      switch (action.type) {
            case ShoppingCartActionType.FetchShoppingCart:
                  newCartState.shoppingCart = action.payload;
                  localStorage.setItem("shopping_cart", JSON.stringify(newCartState.shoppingCart));
                  break;

            case ShoppingCartActionType.FetchItemsFromCart:
                  localStorage.setItem("items_in_cart", JSON.stringify(newCartState.itemsInCart));
                  newCartState.itemsInCart = action.payload;
                  break;

            case ShoppingCartActionType.AddItemToCart:
                  newCartState.itemsInCart.push(action.payload);
                  localStorage.setItem("items_in_cart", JSON.stringify(newCartState.itemsInCart));
                  break
            
            case ShoppingCartActionType.Logout:
                  localStorage.removeItem("shopping_cart");
                  localStorage.removeItem("items_in_cart");
                  newCartState.shoppingCart = null;
                  newCartState.itemsInCart = null;
      }


      return newCartState;
}