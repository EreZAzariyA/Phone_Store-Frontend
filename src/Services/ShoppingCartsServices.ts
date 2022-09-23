import axios from "axios";
import ItemInCartModel from "../Models/item-in-cart model";
import ShoppingCartModel from "../Models/shopping-cart model";
import { addItemToCartAction, fetchItemsFromShoppingCartAction, fetchShoppingCartAction } from "../Redux/ShoppingCartState";
import { shoppingCartStore } from "../Redux/Store";
import config from "../Utils/Config";

class ShoppingCartsServices {

      // Get shopping-cart by user id:
      public async getShoppingCartByUserId(userId: string): Promise<ShoppingCartModel>{
            const response = await axios.get<ShoppingCartModel>(config.urls.shopping_carts.shopping_cart_by_userId + userId);            
            const shoppingCart = response.data;
            // Add alert if shopping cart = ""(no shopping cart).
            shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
            return shoppingCart;
      }

      // Get items from cart by shopping-cart-id:
      public async getItemsFromCartByCartId(shoppingCartId: string): Promise<ItemInCartModel[]>{
            const response = await axios.get<ItemInCartModel[]>(config.urls.shopping_carts.items_in_cart + shoppingCartId);
            const itemsInCart = response.data;
            shoppingCartStore.dispatch(fetchItemsFromShoppingCartAction(itemsInCart));
            return itemsInCart;
      }

      // Add item into shopping-cart:
      public async addItemIntoShoppingCart(itemToAdd: ItemInCartModel): Promise<ItemInCartModel>{
            const response = await axios.post<ItemInCartModel>(config.urls.shopping_carts.add_item_to_cart, itemToAdd);
            const addedItem = response.data;
            shoppingCartStore.dispatch(addItemToCartAction(itemToAdd));
            return addedItem;
      }

}
const shoppingCartServices = new ShoppingCartsServices();
export default shoppingCartServices;