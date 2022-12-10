import { useCallback, useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Form, Image, InputGroup, Row, ToggleButton } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { numberWithCommas } from "../..";
import { PhoneModel } from "../../Models/phone-model";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import { authStore, guestsStore, shoppingCartStore } from "../../Redux/Store";
import UserModel from "../../Models/user-model";
import ItemInCartModel from "../../Models/item-in-cart model";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import notifyService from "../../Services/NotifyService";
import phonesServices from "../../Services/PhonesServices";
import { myLorem } from "../../App";
import OthersPhones from "./OthersPhones";

const PhonePage = () => {
      const [user, setUser] = useState<UserModel>();
      const [phone, setPhone] = useState<PhoneModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const [inCart, setInCart] = useState<boolean>(false);
      const [stock, setStock] = useState<number>(1);
      const params = useParams();

      // Get phone by params:
      const getPhone = useCallback(async () => {
            const phoneId = params.phoneId;
            const phone = await phonesServices.getOnePhoneById(phoneId);
            setPhone(phone);
      }, [params.phoneId]);

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

      // Check if the current phone in user OR guest cart
      const check = useCallback(() => {
            const item = itemsInCart?.find(item => item?.phoneId === phone?.phoneId);

            if (item) {
                  setInCart(true);
            } else {
                  setInCart(false);
            }
      }, [phone?.phoneId, itemsInCart]);

      // Get user OR guest items:
      const getItemsFromCart = useCallback(() => {
            if (!user) {
                  const itemsInCart = guestsStore.getState().itemsInGuestCart;
                  setItemsInCart(itemsInCart);
                  const unsubscribe = guestsStore.subscribe(() => {
                        const itemsInCart = guestsStore.getState().itemsInGuestCart;
                        setItemsInCart(itemsInCart);
                        check();
                  });
                  return () => unsubscribe();
            } else if (user) {
                  const itemsInCart = shoppingCartStore.getState().itemsInCart;
                  setItemsInCart(itemsInCart);
                  const unsubscribe = shoppingCartStore.subscribe(() => {
                        const itemsInCart = shoppingCartStore.getState().itemsInCart;
                        setItemsInCart(itemsInCart);
                        check();
                  });
                  return () => unsubscribe();
            }
      }, [user, check]);


      useEffect(() => {
            getUser();
            getPhone();
            getItemsFromCart();
            check();
      }, [getPhone, getUser, getItemsFromCart, itemsInCart, check]);


      const plus = () => {
            if (stock >= 10) {
                  return;
            }
            setStock(stock + 1);
      }
      const minus = () => {
            if (stock === 0) {
                  return;
            }
            setStock(stock - 1);
      }

      const addToCart = async () => {
            const itemToAdd = new ItemInCartModel();
            itemToAdd.cartId = shoppingCartStore.getState().shoppingCart?.cartId || "guest_cart";
            itemToAdd.phoneId = phone?.phoneId;
            itemToAdd.stock = stock;
            itemToAdd.totalPrice = phone?.price * stock;

            try {
                  if (itemToAdd.stock > 0) {
                        await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
                        if (!inCart) {
                              notifyService.success("Added...");
                        } else if (inCart) {
                              notifyService.success("Updated...");
                        }
                  } else if (itemToAdd.stock === 0) {
                        await shoppingCartServices.removePhoneFromCart(itemToAdd.phoneId, itemToAdd.cartId);
                        notifyService.error("Deleted...");

                  }
            } catch (err: any) {
                  notifyService.error(err);
            }

      }

      return (
            <Container>
                  {/* Back button */}
                  <Row xs='4' sm='4' className="mt-2 mb-2">
                        <Col>
                              <NavLink className='text-decoration-none' to={`/brands/${phone?.brandId}`}>
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>

                  <Container>

                        <Row>
                              {/* Image-carousel */}
                              <Col sm='6' xs='12'>
                                    {/* When image still lode from the server*/}
                                    {phone?.picture === undefined && <Image src={undefineImage} width='60%' alt={"undefine image"} />
                                    }

                                    {/* When there is an image */}
                                    {phone?.picture &&
                                          <Carousel variant="dark">
                                                <Carousel.Item>
                                                      {
                                                            <Image src={phone?.picture} width='70%' alt={`${phone?.name + 'ImageURL'}`} />
                                                      }
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                      {
                                                            <Image src={phone?.picture} width='70%' alt={`${phone?.name + 'ImageURL'}`} />
                                                      }
                                                </Carousel.Item>
                                          </Carousel>
                                    }
                              </Col>
                              {/* Phone details */}
                              <Col sm='6' xs='12' className='p-0' style={{ textAlign: 'left' }}>
                                    <h2>
                                          {phone?.name}
                                          {phone?.name === undefined &&
                                                <p className="w-50 placeholder placeholder-wave placeholder-xs" />
                                          }
                                    </h2>

                                    <div className="text-muted pt-2 pb-2">
                                          {
                                                phone?.description &&
                                                phone?.description + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita ut, deleniti reiciendis nisi unde quod"
                                          }
                                          {
                                                phone?.description === undefined &&
                                                <>
                                                      <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                                      <p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                                      <p className="w-75 placeholder placeholder-wave placeholder-xs" /><p className="w-75 placeholder placeholder-wave placeholder-xs" />
                                                </>
                                          }
                                    </div>

                                    <h5 className="pt-2 pb-2 fw-bolder" style={{ fontFamily: 'sans-serif' }}>
                                          {phone?.price &&
                                                <>
                                                      {"$ " + numberWithCommas(phone?.price)}
                                                </>
                                          }
                                          {phone?.price === undefined &&
                                                <p className="w-25 placeholder placeholder-wave placeholder-xs" />
                                          }
                                    </h5>

                                    <Form className="pt-2 pb-5" >
                                          {phone?.memorySizes?.map(size =>
                                                <ToggleButton
                                                      variant="secondary"
                                                      className='m-1'
                                                      key={size}
                                                      type="radio"
                                                      name={'memorySize'}
                                                      value={size}
                                                >
                                                      {size + "GB"}
                                                </ToggleButton>
                                          )}
                                    </Form>

                                    <Row className="w-75 m-auto">
                                          <Col sm='6' xs='6'>
                                                <InputGroup size="sm">
                                                      <Button variant="success" onClick={plus}>+</Button>
                                                      <InputGroup.Text>{stock}</InputGroup.Text>
                                                      <Button variant='danger' onClick={minus}>-</Button>
                                                </InputGroup>
                                          </Col>
                                          <Col sm='6' xs='6'>
                                                {!inCart &&
                                                      <Button size="sm" className="p-1" variant='dark' onClick={addToCart}>
                                                            Add To Cart ✔
                                                      </Button>
                                                }
                                                {inCart &&
                                                      <Button size="sm" className="p-1" variant='success' onClick={addToCart}>
                                                            In-Cart
                                                      </Button>
                                                }
                                          </Col>
                                    </Row>
                              </Col>
                        </Row>

                        <Row className="mt-3 m-auto">
                              <Col md='8'>
                                    <h3 className="text-decoration-underline">Description</h3>
                                    <Row className="text-sm-start">
                                          {phone?.description + " " + myLorem}
                                          <br />
                                          <br />
                                          {myLorem}
                                    </Row>
                              </Col>
                              <Col md='4'>
                                    <h3 className="text-decoration-underline">In The Box</h3>
                              </Col>
                        </Row>

                        <hr className="mt-5" />
                              {/* Others phones */}
                        <Row>
                              <Container className="w-auto">
                                    <Row>
                                          <h2>You May Also Like</h2>
                                    </Row>
                                    <Row className="flex-nowrap overflow-auto">
                                          <OthersPhones phone={phone} />
                                    </Row>
                              </Container>
                        </Row>
                  </Container>

            </Container >
      )
}

export default PhonePage;
