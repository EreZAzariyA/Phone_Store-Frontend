import axios from "axios";
import config from "../Utils/Config";
import store from "../Redux/Store";
import ItemInCartModel from "../Models/item-in-cart model";
import ShoppingCartModel from "../Models/shopping-cart model";
import { addProductToCartAction, fetchShoppingCartAction, removeProductFromCartAction, resetCartAction, updateProductInCartAction} from "../Redux/slicers/shopping-cart-slicer";

class ShoppingCartsServices {
  public async getShoppingCartByUserId(userId: string): Promise<ShoppingCartModel> {
    const response = await axios.get<ShoppingCartModel>(config.urls.shopping_carts.shopping_cart_by_userId + userId);
    const shoppingCart = response.data;
    store.dispatch(fetchShoppingCartAction(shoppingCart));
    return shoppingCart;
  };

  public async getItemsFromCartByCartId(shoppingCartId: string): Promise<ItemInCartModel[]> {
    const response = await axios.get<ItemInCartModel[]>(config.urls.shopping_carts.items_in_cart + shoppingCartId);
    const itemsInCart = response.data;
    return itemsInCart;
  };

  public async addItemIntoShoppingCart(itemToAdd: ItemInCartModel): Promise<ItemInCartModel> {
    const response = await axios.post<ShoppingCartModel>(config.urls.shopping_carts.add_item_to_cart, itemToAdd);
    const updatedCart = response.data;
    if (updatedCart) {
      const addedItem = updatedCart.products.find((phone) => phone.phone_id === itemToAdd.phone_id)
      store.dispatch(addProductToCartAction(addedItem));
      return addedItem;
    }
  };

  public async updateStockInCart(phoneToUpdate: ItemInCartModel): Promise<ItemInCartModel> {
    const response = await axios.patch<ShoppingCartModel>(config.urls.shopping_carts.update, phoneToUpdate);
    const updatedCart = response.data;
    if (updatedCart) {
      const updatedProduct = updatedCart.products.find((phone) => phone.phone_id === phoneToUpdate.phone_id);
      store.dispatch(updateProductInCartAction(updatedProduct));
      return updatedProduct;
    }
  };

  public async removePhoneFromCart(phoneIdToRemove: string, cartId: string): Promise<void> {
    await axios.delete(config.urls.shopping_carts.remove + phoneIdToRemove + "/" + cartId);
    store.dispatch(removeProductFromCartAction(phoneIdToRemove));
  };

  public async clearShoppingCart(cartId: string): Promise<void> {
    await axios.delete(config.urls.shopping_carts.clear + cartId);
    store.dispatch(resetCartAction());
  };
};
const shoppingCartServices = new ShoppingCartsServices();
export default shoppingCartServices;