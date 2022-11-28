import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { numberWithCommas } from "../..";
import ItemInCartModel from "../../Models/item-in-cart model";
import OrderModel from "../../Models/order-model";
import UserModel from "../../Models/user-model";
import { authStore, guestsStore, shoppingCartStore, store } from "../../Redux/Store";
import { errStyle } from "../Auth-Area/Register";

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
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const { register, handleSubmit, formState, setValue } = useForm<OrderModel>();

      const getUser = useCallback(() => {
            const user = authStore.getState().user;
            if (user) {
                  setUser(user);
            } else if (!user) {
                  setIsGuest(true);
            }
            const subscribe = authStore.subscribe(() => {
                  const user = authStore.getState().user;
                  if (user) {
                        setUser(user);
                  } else if (!user) {
                        setIsGuest(true);
                  }
            });
            return () => subscribe();
      }, []);

      const getUserItems = useCallback(() => {
            if (!user) {
                  const itemInGuestCart = guestsStore.getState().itemsInGuestCart;
                  setItemsInCart(itemInGuestCart);
            } else {
                  const itemsInCart = shoppingCartStore.getState().itemsInCart;
                  setItemsInCart(itemsInCart);
            }
      }, [user]);

      useEffect(() => {
            getUser();
            getUserItems();
            setValue('email', user ? user?.email : "");
            setValue('fullName', user ? user?.firstName + " " + user?.lastName : "");

      }, [getUser, getUserItems, itemsInCart, setValue, user]);

      const submit = (order: OrderModel) => {

            console.log(order);
      }

      const getProductByItemId = (itemId: string) => {
            const products = store.getState().phones;
            const product = products?.find(p => p.phoneId === itemId);
            return product;
      }

      const orderConfirm = useCallback(() => {

      }, []);

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
                        <Col md='8' lg='8' xl='8' style={colStyle} >
                              <Form onSubmit={handleSubmit(submit)}>
                                    <h1>CHECKOUT</h1>

                                    <Form.Text style={{ textAlign: 'justify' }}>
                                          <h6>
                                                User Details
                                          </h6>
                                    </Form.Text>

                                    <Row>
                                          {/* Email */}
                                          <Col>
                                                <FloatingLabel label={"Email"}>
                                                      <Form.Control
                                                            className={`form-control ${formState.errors?.email ? 'is-invalid' : ""}`}
                                                            type="email"
                                                            disabled={!isGuest}
                                                            {...register('email', {
                                                                  required: { value: true, message: "Email is missing" },
                                                                  minLength: { value: 3, message: "Email must be minimum 3 chars" },
                                                                  maxLength: { value: 50, message: "Email can't exceed 50 chars" }
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
                                                            disabled={!isGuest}
                                                            {...register('fullName', {
                                                                  required: { value: true, message: "Full name is missing" },
                                                                  minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                                                                  maxLength: { value: 50, message: "Full name can't exceed 50 chars" }
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

                                    <Row>

                                          {/* Zip Code */}
                                          <Col>
                                                <FloatingLabel
                                                      label='Zip Code'>
                                                      <Form.Control
                                                            type="number"
                                                            className={`form-control ${formState.errors.zipCode ? 'is-invalid' : ''}`}
                                                            {...register('zipCode', {
                                                                  required: { value: true, message: "Zip-code is missing" },
                                                                  minLength: { value: 5, message: "Zip-code must be minimum 5 numbers" },
                                                                  maxLength: { value: 5, message: "Zip-code can't exceed 5 numbers" }
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
                                                            className={`form-control ${formState.errors?.city ? 'is-invalid' : ""}`}
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
                                          <FloatingLabel
                                                label={"Address"}
                                                className="mt-2">
                                                <Form.Control
                                                      className={`form-control ${formState.errors?.address ? 'is-invalid' : ""}`}
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
                                    </Row>


                                    <Button variant="success" type="submit" className="mt-3">Confirm</Button>

                              </Form>
                        </Col>

                        {/* Products List */}
                        <Col md='4' lg='4' xl='4' style={colStyle}>
                              <Form>
                                    <h1>Summery</h1>
                                    <br />
                                    {itemsInCart === undefined && <Spinner animation="border" />}
                                    {itemsInCart?.map(i =>
                                          <Card key={i.phoneId} className='m-1'>
                                                <Row className="flex-md-nowrap w-100">
                                                      <Col md='5'>
                                                            <Card.Img src={getProductByItemId(i?.phoneId)?.picture} width='100' alt='' />
                                                      </Col>
                                                      <Col md='6'>
                                                            <Card.Title>
                                                                  {getProductByItemId(i?.phoneId)?.name}
                                                            </Card.Title>
                                                            <Card.Text className="text-muted">
                                                                  {'$ ' + numberWithCommas(getProductByItemId(i?.phoneId)?.price)}
                                                            </Card.Text>
                                                      </Col>
                                                      <Col md='2'>
                                                            <p>x{i?.stock}</p>
                                                            <Form.Check type="checkbox" defaultChecked disabled />
                                                      </Col>
                                                </Row>
                                          </Card>
                                    )}
                              </Form>
                              <Table variant="light" hover striped className="mt-2">
                                    <tbody>
                                          <tr>
                                                <td>
                                                      Total
                                                </td>
                                                <th>
                                                      {totalPrice + '$'}
                                                </th>
                                          </tr>
                                          <tr>
                                                <td>
                                                      Shipping
                                                </td>
                                                <th>
                                                      50$
                                                </th>
                                          </tr>
                                          <tr>
                                                <td>
                                                      Vat (Included)
                                                </td>
                                                <th>
                                                      Vat
                                                </th>
                                          </tr>
                                    </tbody>

                              </Table>
                        </Col>
                  </Row>
            </Container>
      )
}
export default OrderPage;