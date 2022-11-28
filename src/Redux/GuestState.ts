import ItemInCartModel from "../Models/item-in-cart model";


export class GuestsState {
      public itemsInGuestCart: ItemInCartModel[] = [];

      constructor() {
            const itemsInGuestCart = localStorage.getItem("itemsInGuestCart");
            if (itemsInGuestCart) {
                  this.itemsInGuestCart = JSON.parse(itemsInGuestCart);
            }
      }
}

export enum GuestsActionType {
      FetchGuestItemsAction = "FetchGuestItemsAction",
      AddItemIntoGuestCartAction = "AddItemIntoGuestCartAction",
      UpdateItemInCart = "UpdateItemInCart",
      RemoveItemFromGuestCart = "RemoveItemFromGuestCart"
}
export interface GuestsAction {
      type: GuestsActionType;
      payload?: any;
}


export function fetchGuestItemsAction(itemInCart: ItemInCartModel[]): GuestsAction {
      return { type: GuestsActionType.FetchGuestItemsAction, payload: itemInCart };
};
export function addItemIntoGuestCartCartAction(itemToAdd: ItemInCartModel): GuestsAction {
      return { type: GuestsActionType.AddItemIntoGuestCartAction, payload: itemToAdd };
};
export function updateItemInGuestCart(itemToUpdate: ItemInCartModel): GuestsAction {
      return { type: GuestsActionType.UpdateItemInCart, payload: itemToUpdate };
};
export function removeItemFromGuestCartAction(itemIdToDelete: string): GuestsAction {
      return { type: GuestsActionType.RemoveItemFromGuestCart, payload: itemIdToDelete };
};

export function guestsReducer(currentGuestsState: GuestsState = new GuestsState(), action: GuestsAction): GuestsState {
      const newGuestsState = { ...currentGuestsState };

      switch (action.type) {

            case GuestsActionType.AddItemIntoGuestCartAction:
                  newGuestsState.itemsInGuestCart.push(action.payload);
                  localStorage.setItem('itemsInGuestCart', JSON.stringify(newGuestsState.itemsInGuestCart));
                  break;

            case GuestsActionType.UpdateItemInCart:
                  const newListToUpdate = newGuestsState.itemsInGuestCart.filter(item => item?.phoneId !== action.payload.phoneId);
                  newListToUpdate.push(action.payload);

                  localStorage.setItem('itemsInGuestCart', JSON.stringify(newListToUpdate));
                  break;

            case GuestsActionType.RemoveItemFromGuestCart:
                  const newList = newGuestsState.itemsInGuestCart.filter(i => i.phoneId !== action.payload);
                  newGuestsState.itemsInGuestCart = newList;
                  localStorage.setItem('itemsInGuestCart', JSON.stringify(newGuestsState.itemsInGuestCart));
                  break;
      }


      return newGuestsState;
}