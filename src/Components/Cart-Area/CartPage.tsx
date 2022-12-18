import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import ItemInCartModel from "../../Models/item-in-cart model";
import OrderModel from "../../Models/order-model";
import UserModel from "../../Models/user-model";
import { authStore, guestsStore, ordersStore, shoppingCartStore } from "../../Redux/Store";
import LastOrder from "../OrdersArea/LastOrderToast";
import ItemInCartCard from "./ItemInCartCard";

const CartPage = () => {
      const [user, setUser] = useState<UserModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const [orders, setOrders] = useState<OrderModel[]>();

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

      const getOrders = useCallback(async () => {
            const orders = ordersStore.getState().orders;
            setOrders(orders);
            const subscribe = ordersStore.subscribe(() => {
                  const orders = ordersStore.getState().orders;
                  setOrders(orders);
            });
            return () => subscribe();
      }, []);




      useEffect(() => {
            getUser();
            getItemsFromCart();
            getOrders();
      }, [getUser, getItemsFromCart, getOrders]);

      return (
            <Container>
                  <h1>Your-Cart</h1>
                  {/* When items loaded */}
                  {itemsInCart === undefined &&
                        <Spinner animation="border" role="status" className="p-4 m-4 me-auto">
                              <span className="visually-hidden">Loading...</span>
                        </Spinner>
                  }
                  
                  {/* If there is no items */}
                  {itemsInCart?.length === 0 && <h4>Cart Is Empty</h4>}

                  {/* Mapping the items */}
                  <Row className="m-auto justify-content-center">
                        {orders?.length > 0 &&
                              <Col md='4'>
                                    <>
                                          <h5>You have {orders?.length} order`s on the way</h5>
                                          {orders?.map(order =>
                                                <LastOrder key={order?.orderId} order={order} />
                                          )}
                                    </>
                              </Col>
                        }

                        <Col className="m-auto">
                              <Row>
                                    {itemsInCart?.map(itemInCart =>
                                          <ItemInCartCard key={itemInCart?.phoneId} itemInCart={itemInCart} />
                                    )}
                              </Row>
                        </Col>
                  </Row>

                  <NavLink to={itemsInCart?.length === 0 ? null : '/order'}>
                        <Button className="mt-2" disabled={itemsInCart?.length === 0}>
                              Continue To Order
                        </Button>
                  </NavLink>

            </Container>
      )
}

export default CartPage;