import { useCallback, useEffect, useState } from "react";
import { Button, Container, Nav, Row, Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import ItemInCartModel from "../../Models/item-in-cart model";
import UserModel from "../../Models/user-model";
import { authStore, guestsStore, shoppingCartStore } from "../../Redux/Store";
import ItemInCartCard from "./ItemInCartCard";

const CartPage = () => {
      const [user, setUser] = useState<UserModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

      // Get user OR guest items:
      const getItemsFromCart = useCallback(() => {
            if (!user) {
                  const itemsInCart = guestsStore.getState().itemsInGuestCart;
                  setItemsInCart(itemsInCart);
                  const subscribe = guestsStore.subscribe(() => {
                        const itemsInCart = guestsStore.getState().itemsInGuestCart;
                        setItemsInCart(itemsInCart);
                  });
                  return () => subscribe();
            } else if (user) {
                  const itemsInCart = shoppingCartStore.getState().itemsInCart;
                  setItemsInCart(itemsInCart);
                  const subscribe = shoppingCartStore.subscribe(() => {
                        const itemsInCart = shoppingCartStore.getState().itemsInCart;
                        setItemsInCart(itemsInCart);
                  });
                  return () => subscribe()
            }
      }, [user]);

      // Get user: (If there is one)
      const getUser = useCallback(() => {
            const user = authStore.getState().user;
            setUser(user);

            const unsubscribe = authStore.subscribe(() => {
                  const user = authStore.getState().user;
                  setUser(user);
            });
            return () => unsubscribe();
      }, []);

      useEffect(() => {
            getUser()
            getItemsFromCart();

      }, [getItemsFromCart, getUser]);

      return (
            <Container>
                  <h1>Your-Cart</h1>
                  {itemsInCart?.length === 0 &&
                        <h4>Cart Is Empty</h4>
                  }
                  {itemsInCart === undefined &&
                        <Spinner animation="border" role="status" className="p-4 m-4 me-auto">
                              <span className="visually-hidden">Loading...</span>
                        </Spinner>
                  }
                  <Row className="m-auto justify-content-center">
                        {itemsInCart?.map(itemInCart =>
                              <ItemInCartCard key={itemInCart?.phoneId} itemInCart={itemInCart} />
                        )}
                  </Row>

                  <NavLink to={itemsInCart?.length === 0 ? null : '/order'} >
                        <Button className="mt-2" disabled={itemsInCart?.length === 0}>
                              Continue To Order
                        </Button>
                  </NavLink>

            </Container>
      )
}

export default CartPage;