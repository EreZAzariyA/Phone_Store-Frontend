import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, FormFloating, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";
import { errStyle } from "../Auth-Area/Register";

const formStyle: React.CSSProperties = {
      textAlign: 'justify',
      display: 'inline-grid',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px'
}


const OrderPage = () => {

      const [user, setUser] = useState<UserModel>();
      const [isGuest, setIsGuest] = useState(false);
      const { register, handleSubmit, formState } = useForm();

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

      useEffect(() => {
            getUser();
      });

      return (
            <Container className="mt-3 m-2">
                  {/* Back Button */}
                  <Row>
                        <Col sm='2' >
                              <NavLink to='/cart'>
                                    Go Back
                              </NavLink>
                        </Col>
                  </Row>
                  {/* Check-out */}
                  <Row className="mt-2 g-2">
                        {/* Form */}
                        <Col sm='8' style={formStyle}>
                              <Row>

                                    <h1>CHECKOUT</h1>
                                    <Form.Floating>
                                          <Form.Text style={{ textAlign: 'center' }}>
                                                <h6>
                                                      User Details
                                                </h6>
                                          </Form.Text>
                                          <Col sm='6'>

                                                {/* Email */}
                                                <FloatingLabel
                                                      label={"Email"}
                                                      className="mt-2 mb-2">
                                                      <Form.Control
                                                            autoFocus
                                                            type="email"
                                                            disabled={!isGuest}
                                                            value={user ? user?.email : ''}
                                                            {...register('email', {
                                                                  required: { value: true, message: "Email is missing" },
                                                                  minLength: { value: 3, message: "Email must be minimum 3 chars" },
                                                                  maxLength: { value: 50, message: "Email can't exceed 50 chars" }
                                                            })} />

                                                      {/* <span className="mb-2" style={errStyle}>
                                                {formState.errors.email?.message}
                                          </span> */}
                                                </FloatingLabel>
                                          </Col>

                                          <Col sm='5'>

                                                {/* Full name */}
                                                <FloatingLabel
                                                      label='Full Name'
                                                      className="mt-2">
                                                      <Form.Control
                                                            type="text"
                                                            disabled={!isGuest}
                                                            value={user ? user?.firstName + ' ' + user?.lastName : ''}
                                                            {...register('fullName', {
                                                                  required: { value: true, message: "Full name is missing" },
                                                                  minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                                                                  maxLength: { value: 50, message: "Full name can't exceed 50 chars" }
                                                            })} />
                                                </FloatingLabel>
                                          </Col>

                                          <FloatingLabel
                                                label={"Phone number"}
                                                className="mt-2 mb-2">
                                                <Form.Control type="number"
                                                      {...register('lastName', {
                                                            required: { value: true, message: "Phone number is missing" },
                                                            minLength: { value: 3, message: "Phone number must be minimum 3 chars" },
                                                            maxLength: { value: 50, message: "Phone number can't exceed 50 chars" }
                                                      })} />
                                          </FloatingLabel>
                                    </Form.Floating>

                                    <Form.Floating>
                                          <Form.Text style={{ textAlign: 'center' }}>
                                                <h6>
                                                      Shopping Details
                                                </h6>
                                          </Form.Text>
                                          {/* Address */}
                                          <FloatingLabel
                                                label={"Address"}
                                                className="mt-2 mb-2">
                                                <Form.Control
                                                      type="text"
                                                      {...register('address', {
                                                            required: { value: true, message: "Address is missing" },
                                                            minLength: { value: 3, message: "Address must be minimum 3 chars" },
                                                            maxLength: { value: 50, message: "Address can't exceed 50 chars" }
                                                      })} />

                                                {/* <span className="mb-2" style={errStyle}>
                                                {formState.errors.email?.message}
                                          </span> */}
                                          </FloatingLabel>

                                          {/* Full name */}
                                          <FloatingLabel
                                                label='Full Name'
                                                className="mt-2">
                                                <Form.Control
                                                      type="text"
                                                      disabled={!isGuest}
                                                      value={user ? user?.firstName + ' ' + user?.lastName : ''}
                                                      {...register('fullName', {
                                                            required: { value: true, message: "Full name is missing" },
                                                            minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                                                            maxLength: { value: 50, message: "Full name can't exceed 50 chars" }
                                                      })} />
                                          </FloatingLabel>

                                          <FloatingLabel
                                                label={"Phone number"}
                                                className="mt-2 mb-2">
                                                <Form.Control type="number"
                                                      {...register('lastName', {
                                                            required: { value: true, message: "Phone number is missing" },
                                                            minLength: { value: 3, message: "Phone number must be minimum 3 chars" },
                                                            maxLength: { value: 50, message: "Phone number can't exceed 50 chars" }
                                                      })} />
                                          </FloatingLabel>
                                    </Form.Floating>
                              </Row>

                        </Col>

                        {/* Products List */}
                        <Col sm='4'></Col>
                  </Row>
            </Container>
      )
}
export default OrderPage;