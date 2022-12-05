import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import ItemInCartModel from "../../Models/item-in-cart model"
import { PhoneModel } from "../../Models/phone-model";
import { removeItemFromGuestCartAction } from "../../Redux/GuestState";
import { authStore, guestsStore } from "../../Redux/Store";
import notifyService from "../../Services/NotifyService";
import phonesServices from "../../Services/PhonesServices";
import shoppingCartServices from "../../Services/ShoppingCartsServices";

interface ItemInCartCardProps {
      itemInCart: ItemInCartModel;
}

const ItemInCartCard = (props: ItemInCartCardProps) => {
      const [phone, setPhone] = useState<PhoneModel>();
      const [stock, setStock] = useState(0);

      const getPhoneByItemId = useCallback(async () => {
            const phone = await phonesServices.getOnePhoneById(props.itemInCart.phoneId);
            setPhone(phone);
      }, [props.itemInCart]);

      useEffect(() => {
            getPhoneByItemId();
            setStock(props.itemInCart?.stock);
      }, [getPhoneByItemId, props.itemInCart]);

      const deleteFromCart = async () => {
            const q = window.confirm("Are you sure?");
            if (!q) {
                  return;
            }
            const user = authStore.getState().user;
            try {
                  if (user) {
                        await shoppingCartServices.removePhoneFromCart(props.itemInCart.phoneId, props.itemInCart.cartId);
                  } else {
                        guestsStore.dispatch(removeItemFromGuestCartAction(props.itemInCart.phoneId));
                  }
                  notifyService.error('Removed...');
            } catch (err: any) {
                  notifyService.error(err);
            }
      };

      const plus = async () => {
            if (stock === 9) {
                  return;
            } else {
                  try {
                        setStock(stock + 1);
                        const itemPlus = new ItemInCartModel();
                        itemPlus.cartId = props.itemInCart.cartId;
                        itemPlus.phoneId = props.itemInCart.phoneId;
                        itemPlus.stock = stock + 1;
                        itemPlus.totalPrice = (stock + 1) * phone?.price;
                        await shoppingCartServices.updateStockInCart(itemPlus);
                        notifyService.success('updated....');
                  } catch (err: any) {
                        notifyService.error(err);
                  }
            }
      };

      const minus = async () => {
            if (stock === 1) {
                  return;
            } else {
                  try {
                        setStock(stock - 1);
                        const itemPlus = new ItemInCartModel();
                        itemPlus.cartId = props.itemInCart.cartId;
                        itemPlus.phoneId = props.itemInCart.phoneId;
                        itemPlus.stock = stock - 1;
                        itemPlus.totalPrice = props.itemInCart.stock * phone?.price;
                        await shoppingCartServices.updateStockInCart(itemPlus);
                        notifyService.success('updated....');
                  } catch (err: any) {
                        notifyService.error(err);
                  }
            }
      }

      return (
            <Card className="m-1 p-1 w-auto text-decoration-none mb-3" hidden={!phone}>
                  <Button
                        size='sm'
                        variant="danger"
                        style={{ position: 'absolute', right: '5px', top: '5px' }}
                        onClick={deleteFromCart}>
                        -
                  </Button>

                  <Card.Img variant="top" src={phone?.picture} height={200} alt='' />

                  <Card.Body>
                        <Card.Title>
                              {phone?.name}
                        </Card.Title>
                        <Card.Text className="text-muted mt-3 text-decoration-underline" as={Row}>
                              {stock === 1 ?
                                    <>
                                          <Col xs='8'>
                                                {'$' + numberWithCommas(phone?.price)}
                                          </Col>
                                          <Col xs='4'>
                                                x1
                                          </Col>
                                    </>
                                    :
                                    <>
                                          <Col xs='8'>
                                                {'$' + numberWithCommas(stock * phone?.price)}
                                          </Col>
                                          <Col xs='4'>
                                                {'x' + stock}
                                          </Col>
                                    </>
                              }
                        </Card.Text>

                        <InputGroup size="sm" className="justify-content-center mt-3">
                              <Button variant="dark" onClick={plus} disabled={stock === 9}>
                                    +
                              </Button>

                              <InputGroup.Text>
                                    {stock}
                              </InputGroup.Text>

                              <Button variant="dark" onClick={minus} disabled={stock === 1}>
                                    -
                              </Button>
                        </InputGroup>
                  </Card.Body >
            </Card >
      )
}

export default ItemInCartCard;