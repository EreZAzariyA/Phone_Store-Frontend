import axios from "axios";
import ItemInCartModel from "../Models/item-in-cart model";
import ShoppingCartModel from "../Models/shopping-cart model";
import { addItemIntoGuestCartCartAction, removeItemFromGuestCartAction, updateItemInGuestCart } from "../Redux/GuestState";
import { addItemToCartAction, fetchItemsFromShoppingCartAction, fetchShoppingCartAction, removeItemFromCartAction, updateItemInCartAction } from "../Redux/ShoppingCartState";
import { authStore, guestsStore, shoppingCartStore } from "../Redux/Store";
import config from "../Utils/Config";

class ShoppingCartsServices {

      // Get shopping-cart by user id:
      public async getShoppingCartByUserId(userId: string): Promise<ShoppingCartModel> {
            const response = await axios.get<ShoppingCartModel>(config.urls.shopping_carts.shopping_cart_by_userId + userId);
            const shoppingCart = response.data;
            // Add alert if shopping cart = ""(no shopping cart).
            shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
            return shoppingCart;
      }

      // Get items from cart by shopping-cart-id:
      public async getItemsFromCartByCartId(shoppingCartId: string): Promise<ItemInCartModel[]> {
            if (shoppingCartStore.getState().itemsInCart?.length === 0 || !shoppingCartStore.getState().itemsInCart) {
                  const response = await axios.get<ItemInCartModel[]>(config.urls.shopping_carts.items_in_cart + shoppingCartId);
                  const itemsInCart = response.data;
                  shoppingCartStore.dispatch(fetchItemsFromShoppingCartAction(itemsInCart));
                  return itemsInCart;
            }
            const itemsInCart = shoppingCartStore.getState().itemsInCart;
            return itemsInCart;
      }

      // Add item into shopping-cart:
      public async addItemIntoShoppingCart(itemToAdd: ItemInCartModel): Promise<ItemInCartModel> {
            if (authStore.getState().user) {
                  const response = await axios.post<ItemInCartModel>(config.urls.shopping_carts.add_item_to_cart, itemToAdd);
                  const addedItem = response.data;
                  shoppingCartStore.dispatch(addItemToCartAction(itemToAdd));
                  return addedItem;
            } else {
                  guestsStore.dispatch(addItemIntoGuestCartCartAction(itemToAdd));
                  return itemToAdd
            }
      }

      public async updateStockInCart(phoneToUpdate: ItemInCartModel): Promise<ItemInCartModel> {
            if (authStore.getState().user) {
                  const response = await axios.patch<ItemInCartModel>(config.urls.shopping_carts.update, phoneToUpdate);
                  const updatedItem = response.data;
                  shoppingCartStore.dispatch(updateItemInCartAction(updatedItem));
                  return updatedItem;
            } else {
                  guestsStore.dispatch(updateItemInGuestCart(phoneToUpdate));
                  return phoneToUpdate
            }
      }

      public async removePhoneFromCart(phoneIdToRemove: string, cartId: string): Promise<void> {
            if (authStore.getState().user) {
                  await axios.delete(config.urls.shopping_carts.remove + phoneIdToRemove + "/" + cartId);
                  shoppingCartStore.dispatch(removeItemFromCartAction(phoneIdToRemove));
            } else {
                  guestsStore.dispatch(removeItemFromGuestCartAction(phoneIdToRemove));
            }
      }

}
const shoppingCartServices = new ShoppingCartsServices();
export default shoppingCartServices;