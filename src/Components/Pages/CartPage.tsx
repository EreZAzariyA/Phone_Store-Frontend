import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import ItemInCartModel from "../../Models/item-in-cart model";
import UserModel from "../../Models/user-model";
import { authStore, guestsStore, shoppingCartStore, store } from "../../Redux/Store";
import shoppingCartServices from "../../Services/ShoppingCartsServices";

const CartPage = () => {
      const [user, setUser] = useState<UserModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

      const getItems = useCallback(async (user: UserModel) => {

            // If there is a user
            if (user) {
                  const shoppingCartId = shoppingCartStore.getState().shoppingCart.cartId;
                  const itemsInUserCart = await shoppingCartServices.getItemsFromCartByCartId(shoppingCartId);
                  setItemsInCart(itemsInUserCart);

            } else if (!user) {
                  // If there is no user (Guest):
                  const itemsInGuestCart = guestsStore.getState()?.itemsInGuestCart;
                  setItemsInCart(itemsInGuestCart);
            }

      }, []);

      useEffect(() => {
            const user = authStore.getState().user;
            setUser(user);
            getItems(user);

            const subscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });

            return () => subscribe();
      }, [getItems,user]);

      const getPhoneById = (phoneId: string) => {
            const phone = store.getState().phones?.find(p => p.phoneId === phoneId);
            return phone;
      }

      return (
            <Container>
                  {(!itemsInCart || itemsInCart.length === 0) &&
                        <h1>Your Cart Is Empty</h1>
                  }
                  {itemsInCart?.map(item =>
                        <h1 key={item?.phoneId}>{getPhoneById(item?.phoneId)?.name}</h1>
                  )}

            </Container>
      )
}

export default CartPage;