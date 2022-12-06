import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { numberWithCommas } from "../..";
import ItemInCartModel from "../../Models/item-in-cart model";
import OrderModel from "../../Models/order-model";
import UserModel from "../../Models/user-model";
import { authStore, guestsStore, shoppingCartStore, store } from "../../Redux/Store";
import { errStyle } from "../Auth-Area/Register";
import CreditCard from "./CreditCard";
import OrderConfirm from "./OrderConfirmModal";

const colStyle: React.CSSProperties = {
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '10px',
      margin: '5px'
}

const OrderPage = () => {
      const [user, setUser] = useState<UserModel>();
      const [isGuest, setIsGuest] = useState(false);
      const [totalPrice, setTotalPrice] = useState(0);
      const [inCreditCard, setInCreditCard] = useState(false);
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const { register, handleSubmit, formState, setValue } = useForm<OrderModel>();
      const [show, setShow] = useState(false);
      const [order, setOrder] = useState<OrderModel>();
      const [cardHolderName, setCardHolderName] = useState<string>("");
      const [cardNumber, setCardNumber] = useState<number>(0);
      const [cardExpDate, setCardExpDate] = useState<number>(0);
      const [cvc, setCvc] = useState<number>(0);


      const handleClose = () => {
            const q = window.confirm('Are you sure?');
            if (q) {
                  setShow(false)
            }
      };
      const handleShow = () => setShow(true);;

      const getUser = useCallback(() => {
            const user = authStore.getState().user;
            if (user) {
                  setUser(user);
            } else if (!user) {
                  setIsGuest(true);
            }
            const subscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
                  if (!user) {
                        setIsGuest(true);
                  }
            });
            return () => subscribe();
      }, []);

      const getTotalPrice = useCallback(() => {
            let sum: number = 0;
            itemsInCart?.forEach(item => {
                  sum += item?.totalPrice
            });
            setTotalPrice(sum);
      }, [itemsInCart]);

      const getUserItems = useCallback(() => {
            if (!user) {
                  const itemInGuestCart = guestsStore.getState().itemsInGuestCart;
                  setItemsInCart(itemInGuestCart);
            } else if (user) {
                  const itemsInCart = shoppingCartStore.getState().itemsInCart;
                  setItemsInCart(itemsInCart);
            }
      }, [user]);

      useEffect(() => {
            getUser();
            getUserItems();
            setValue('email', user ? user?.email : null);
            setValue('fullName', user ? user?.firstName + " " + user?.lastName : "");
            getTotalPrice();
      }, [getUser, getUserItems, itemsInCart, setValue, user, getTotalPrice]);



      const submit = (order: OrderModel) => {
            setOrder(order);
            handleShow();
            console.log(order);
      }

      const getProductByItemId = (itemId: string) => {
            const products = store.getState().phones;
            const product = products?.find(p => p.phoneId === itemId);
            return product;
      }

      return (
            <Container>
                  {/* Back Button */}
                  <Row>
                        <Col>
                              <NavLink to='/cart' className="float-start">
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>

                  {/* Check-out & Summery */}
                  <Row className="mt-2 p-3 flex-md-nowrap justify-content-center">
                        {/* Form */}
                        <Col md='8' lg='8' xl='8' style={colStyle}>
                              <Form onSubmit={handleSubmit(submit)}>
                                    <h1>CHECKOUT</h1>

                                    <Form.Text style={{ textAlign: 'justify' }}>
                                          <h6>
                                                User Details
                                          </h6>
                                    </Form.Text>

                                    {/* User-Details */}
                                    <Row>
                                          {/* Email */}
                                          <Col>
                                                <FloatingLabel label={"Email"}>
                                                      <Form.Control
                                                            className={`form-control ${formState.errors.email ? 'is-invalid' : ''}`}
                                                            type="email"
                                                            disabled={!isGuest}
                                                            {...register('email', {
                                                                  required: { value: true, message: "Email is missing" },
                                                                  minLength: { value: 3, message: "Email must be minimum 3 chars" },
                                                                  maxLength: { value: 50, message: "Email can't exceed 50 chars" },
                                                                  pattern: {
                                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                        message: "Invalid email address"
                                                                  }
                                                            })} />

                                                      <span className="mb-2" style={errStyle}>
                                                            {formState.errors.email?.message}
                                                      </span>
                                                </FloatingLabel>
                                          </Col>

                                          {/* Full name */}
                                          <Col>
                                                <FloatingLabel
                                                      label='Full Name'>
                                                      <Form.Control
                                                            className={`form-control ${formState.errors.fullName ? 'is-invalid' : ''}`}
                                                            type="text"
                                                            maxLength={20}
                                                            disabled={!isGuest}
                                                            {...register('fullName', {
                                                                  required: { value: true, message: "Full name is missing" },
                                                                  minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                                                                  maxLength: { value: 20, message: "Full name can't exceed 20 chars" },
                                                                  pattern: { value: /^[a-zA-Z]+ [a-zA-Z]+$/, message: 'Invalid name' },
                                                                  onChange(event) {
                                                                        setCardHolderName((event?.target as HTMLInputElement)?.value)
                                                                  }
                                                            })} />
                                                      <span className="mb-2" style={errStyle}>
                                                            {formState.errors.fullName?.message}
                                                      </span>
                                                </FloatingLabel>
                                          </Col>
                                    </Row>

                                    <hr />
                                    <Form.Text style={{ textAlign: 'justify' }}>
                                          <h6>
                                                Shopping Details
                                          </h6>
                                    </Form.Text>

                                    {/* Shipping-Details */}
                                    <Row>
                                          {/* Zip Code */}
                                          <Col>
                                                <FloatingLabel
                                                      label='Zip Code'>
                                                      <Form.Control
                                                            type="tel"
                                                            maxLength={5}
                                                            className={`form-control ${formState.errors.zipCode ? 'is-invalid' : ''}`}
                                                            {...register('zipCode', {
                                                                  required: { value: true, message: "Zip-code is missing" },
                                                                  minLength: { value: 5, message: "Zip-code must be minimum 5 numbers" },
                                                                  maxLength: { value: 5, message: "Zip-code can't exceed 5 numbers" },
                                                                  pattern: { value: /^[A-Za-z0-9]+$/i, message: 'Invalid Zip-code' },
                                                            })} />
                                                      <span className="mb-2" style={errStyle}>
                                                            {formState.errors.zipCode?.message}
                                                      </span>
                                                </FloatingLabel>
                                          </Col>

                                          {/* City */}
                                          <Col>
                                                <FloatingLabel
                                                      label={"City"}>
                                                      <Form.Control type="text"
                                                            className={`form-control ${formState.errors.city ? 'is-invalid' : ''}`}
                                                            {...register('city', {
                                                                  required: { value: true, message: "City is missing" },
                                                                  minLength: { value: 3, message: "City must be minimum 3 chars" },
                                                                  maxLength: { value: 50, message: "City can't exceed 50 chars" }
                                                            })} />
                                                      <span className="mb-2" style={errStyle}>
                                                            {formState.errors.city?.message}
                                                      </span>
                                                </FloatingLabel>
                                          </Col>

                                          {/* Address */}
                                          <Col xs='12'>
                                                <FloatingLabel
                                                      label={"Address"}
                                                      className="mt-2">
                                                      <Form.Control
                                                            className={`form-control ${formState.errors.address ? 'is-invalid' : ''}`}
                                                            type="text"
                                                            {...register('address', {
                                                                  required: { value: true, message: "Address is missing" },
                                                                  minLength: { value: 3, message: "Address must be minimum 3 chars" },
                                                                  maxLength: { value: 70, message: "Address can't exceed 70 chars" }
                                                            })} />

                                                      <span className="mb-2" style={errStyle}>
                                                            {formState.errors.address?.message}
                                                      </span>
                                                </FloatingLabel>
                                          </Col>
                                    </Row>

                                    <hr />
                                    <Form.Text style={{ textAlign: 'justify' }}>
                                          <h6>
                                                Payment-Method
                                          </h6>
                                    </Form.Text>

                                    {/* Payment method radio */}
                                    <Row className="justify-content-center">
                                          <Col xs='6' sm='4'>
                                                <Form.Check
                                                      inline
                                                      label={"Credit-Card"}
                                                      type="radio"
                                                      name={'card'}
                                                      required
                                                      onChange={() => setInCreditCard(true)}
                                                />
                                          </Col>
                                          <Col xs='6' sm='4'>
                                                <Form.Check
                                                      inline
                                                      type="radio"
                                                      label={"PayPal"}
                                                      name={'card'}
                                                      required
                                                      onChange={() => setInCreditCard(false)}
                                                />
                                          </Col>
                                    </Row>

                                    {/* Credit-Card details */}
                                    {inCreditCard === true &&
                                          <>
                                                <Row>
                                                      <Col>
                                                            <CreditCard
                                                                  name={cardHolderName || ""}
                                                                  number={cardNumber}
                                                                  expDate={cardExpDate}
                                                                  cvc={cvc} />
                                                      </Col>
                                                </Row>
                                                <Row>

                                                      {/* Card number */}
                                                      <Col sm='12' className="mt-2">
                                                            <Form.Text>
                                                                  Card-Number
                                                            </Form.Text>
                                                            <FloatingLabel
                                                                  label={"XXXX-XXXX-XXXX-XXXX"}
                                                                  className="mt-2"
                                                            >
                                                                  <Form.Control
                                                                        className={`form-control ${formState.errors.paymentMethod?.creditCard?.cardNumber ? 'is-invalid' : ''} `}
                                                                        type="tel"
                                                                        maxLength={16}
                                                                        {...register('paymentMethod.creditCard.cardNumber', {
                                                                              required: { value: true, message: "Card number is missing" },
                                                                              minLength: { value: 16, message: "Card number must be minimum 16 numbers" },
                                                                              maxLength: { value: 16, message: "Card number can't exceed 16 numbers" },
                                                                              onChange(event: SyntheticEvent) {
                                                                                    const value = (event?.target as HTMLInputElement)?.value as any;
                                                                                    setCardNumber(value);
                                                                              }
                                                                        })} />

                                                                  <span className="mb-2" style={errStyle}>
                                                                        {formState.errors.paymentMethod?.creditCard?.cardNumber?.message}
                                                                  </span>
                                                            </FloatingLabel>
                                                      </Col>

                                                      {/* Expire date */}
                                                      <Col xs='6'>
                                                            <Form.Text>
                                                                  Exp. Date
                                                            </Form.Text>
                                                            <FloatingLabel
                                                                  label={"MM/YY"}
                                                                  className="mt-2"
                                                            >
                                                                  <Form.Control
                                                                        className={`form-control ${formState.errors.paymentMethod?.creditCard?.expiredDate ? 'is-invalid' : ''} `}
                                                                        type="month"
                                                                        {...register('paymentMethod.creditCard.expiredDate', {
                                                                              required: { value: true, message: "Card expire date is missing" },
                                                                              maxLength: { value: 30, message: 'Error' },
                                                                              minLength: { value: 5, message: 'Expire date can`t be lass then 4 digits' },
                                                                              onChange(event: SyntheticEvent) {
                                                                                    const value = +(event.target as HTMLInputElement).value?.replace('-', '').replace('20', '');
                                                                                    setCardExpDate(value);
                                                                              }
                                                                        })} />

                                                                  <span className="mb-2" style={errStyle}>
                                                                        {formState.errors.paymentMethod?.creditCard?.expiredDate?.message}
                                                                  </span>
                                                            </FloatingLabel>
                                                      </Col>

                                                      {/* Security number*/}
                                                      <Col xs='6'>
                                                            <Form.Text>
                                                                  CVC
                                                            </Form.Text>
                                                            <FloatingLabel
                                                                  label={'cvc'}
                                                                  className="mt-2"
                                                            >
                                                                  <Form.Control
                                                                        className={`form-control ${formState.errors.paymentMethod?.creditCard?.securityNumber ? 'is-invalid' : ''} `}
                                                                        type="tel"
                                                                        maxLength={3}
                                                                        {...register('paymentMethod.creditCard.securityNumber', {
                                                                              required: { value: true, message: "Security number is missing" },
                                                                              maxLength: { value: 3, message: 'Security number can`t exceed 3 digits' },
                                                                              minLength: { value: 3, message: 'Security number must be 3 digits' },
                                                                              onChange(event: SyntheticEvent) {
                                                                                    const value = +(event.target as HTMLInputElement).value?.replace('-', '').replace('20', '');
                                                                                    setCvc(value);
                                                                              }
                                                                        })} />

                                                                  <span className="mb-2" style={errStyle}>
                                                                        {formState.errors.paymentMethod?.creditCard?.securityNumber?.message}

                                                                  </span>
                                                            </FloatingLabel>
                                                      </Col>
                                                </Row>

                                          </>
                                    }

                                    <Button variant="success" type="submit" className="mt-3 mb-2">Confirm Order</Button>
                              </Form>
                        </Col>

                        {/* Products List */}
                        <Col md='4' lg='4' xl='4' style={colStyle}>
                              <h1>Summery</h1>
                              <br />
                              {itemsInCart === undefined && <Spinner animation="border" />}
                              {itemsInCart?.map(i =>
                                    <Card key={i.phoneId} className='m-1'>
                                          <Row className="flex-md-nowrap w-100">
                                                <Col md='5'>
                                                      <Card.Img src={getProductByItemId(i?.phoneId)?.picture} width='100' alt='' />
                                                </Col>
                                                <Col md='7'>
                                                      <Card.Title>
                                                            {getProductByItemId(i?.phoneId)?.name}
                                                      </Card.Title>
                                                      <Card.Text className="text-muted">
                                                            {'$' + numberWithCommas(getProductByItemId(i?.phoneId)?.price) + ' x ' + i?.stock}
                                                            <br />
                                                            <span className="text-decoration-underline">
                                                                  {'$' + numberWithCommas(getProductByItemId(i?.phoneId)?.price * i?.stock)}
                                                            </span>
                                                      </Card.Text>
                                                </Col>
                                          </Row>
                                    </Card>

                              )}
                              <Table variant="light" hover striped className="mt-2">
                                    <tbody>
                                          <tr>
                                                <td>
                                                      Total
                                                </td>
                                                <th>
                                                      {numberWithCommas(totalPrice + 50) + '$'}
                                                </th>
                                          </tr>
                                          <tr>
                                                <td>
                                                      Shipping (Included)
                                                </td>
                                                <th>
                                                      50$
                                                </th>
                                          </tr>
                                          <tr>
                                                <td>
                                                      Vat (Included 17%)
                                                </td>
                                                <th>
                                                      {((17 / 100) * totalPrice).toFixed(2) + '$'}
                                                </th>
                                          </tr>
                                    </tbody>

                              </Table>
                        </Col>
                  </Row>

                  <OrderConfirm show={show} handleClose={handleClose} order={order} />
            </Container>
      )
}
export default OrderPage;