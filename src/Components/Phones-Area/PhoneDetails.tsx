import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, Image, InputGroup, Row, ToggleButton } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { numberWithCommas } from "../..";
import { PhoneModel } from "../../Models/phone-model";
import storeServices from "../../Services/StoreServices";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import { authStore, shoppingCartStore } from "../../Redux/Store";
import UserModel from "../../Models/user-model";
import ItemInCartModel from "../../Models/item-in-cart model";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import notifyService from "../../Services/NotifyService";

const PhoneDetails = () => {
      const [user, setUser] = useState<UserModel>();
      const [phone, setPhone] = useState<PhoneModel>();
      const [inCart, setInCart] = useState<boolean>(false);
      const [stock, setStock] = useState<number>(1);
      const params = useParams();
      const navigate = useNavigate();

      const getPhoneById = useCallback(async (phoneId: string) => {
            const phone = await storeServices.getOnePhone(phoneId);
            setPhone(phone);
            phone.memorySizes = [64, 512, 256, 128];
      }, []);

      const check = useCallback(async (phoneId: string) => {
            if (user) {
                  const shoppingCartId = shoppingCartStore.getState().shoppingCart?.cartId;
                  const itemsInUserCart = await shoppingCartServices.getItemsFromCartByCartId(shoppingCartId);

                  if (itemsInUserCart.find(item => item?.phoneId === phoneId)) {
                        setInCart(true);
                        const stock = itemsInUserCart.find(item => item?.phoneId === phoneId)?.stock
                        setStock(stock);
                  } else {
                        setInCart(false);
                  }
            }
      }, [user]);

      useEffect(() => {
            const phoneId = params.phoneId;
            getPhoneById(phoneId);
            check(phoneId);

            const user = authStore.getState().user;
            setUser(user);

            const authSubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });

            return () => authSubscribe();
      }, [params.phoneId, getPhoneById, check]);



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
            itemToAdd.cartId = shoppingCartStore.getState().shoppingCart.cartId;
            itemToAdd.phoneId = phone?.phoneId;
            itemToAdd.stock = stock;
            itemToAdd.totalPrice = phone?.price * stock;

            try {
                  await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
                  notifyService.success("Added...");
                  navigate(`/brands/${phone?.brandId}`)
            } catch (err: any) {
                  notifyService.error(err);
            }
      }

      return (
            <Container>
                  {/* Back button */}
                  <Row className="mt-2 mb-2">
                        <Col xs='3' sm='2'>
                              <NavLink className='text-decoration-none' to={`/brands/${phone?.brandId}`}>
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>

                  <Row>
                        {/* Image-carousel */}
                        <Col sm='6' xs='12'>
                              {/* When image still lode from the server */}
                              {
                                    phone?.picture === undefined && <Image src={undefineImage} alt={"undefine image"} />
                              }
                              {/* When there is an image */}
                              {phone?.picture &&
                                    <Carousel variant="dark" style={{ borderRadius: '10px' }}>
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

                        <Col sm='5' xs='12' className='p-2' style={{ textAlign: 'left' }}>
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

                              <h6 className="pt-2 pb-2">
                                    {phone?.price &&
                                          <>
                                                {"$ " + numberWithCommas(phone?.price)}
                                          </>
                                    }
                                    {phone?.price === undefined &&
                                          <p className="w-25 placeholder placeholder-wave placeholder-xs" />
                                    }
                              </h6>

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
                  </Row >

                  <Row className="mt-4">
                        {/* Others brands */}
                        <Container>
                              <Row>
                                    <h2>You May Also Like</h2>
                              </Row>
                              <Row className="flex-nowrap overflow-auto">
                                    {OthersPhones(phone)}
                              </Row>
                        </Container>
                  </Row>
            </Container >
      )
}

export default PhoneDetails;


const OthersPhones = (phone: PhoneModel) => {
      const [othersPhones, setOthersPhones] = useState<PhoneModel[]>();


      useMemo(async () => {
            const phonesBySameBrand = await storeServices.getPhonesByBrandId(phone?.brandId);
            const othersPhones = phonesBySameBrand.filter(p => p?.phoneId !== phone?.phoneId);
            setOthersPhones(othersPhones);
      }, [phone]);

      return (
            <>
                  {othersPhones?.map(p =>
                        <Card key={p.phoneId} as={Col} xs='6' sm='4' md='2' className="m-1 m-md-auto p-1">
                              <Card.Img src={p?.picture} variant='top' height='100%' alt='' />

                              <Card.Title>
                                    {p.name}
                              </Card.Title>
                              <Card.Body>
                                    <NavLink to={`/phone/${p?.phoneId}`}>
                                          <Button size='sm' variant="dark">
                                                Go See
                                          </Button>
                                    </NavLink>
                              </Card.Body>
                        </Card>
                  )}
            </>
      );
}
