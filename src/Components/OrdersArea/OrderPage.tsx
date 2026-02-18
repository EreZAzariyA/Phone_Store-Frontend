import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { RootState } from "../../Redux/Store";
import OrderModel from "../../Models/order-model";
import OrderConfirm from "./OrderConfirmModal";
import notifyService from "../../Services/NotifyService";
import ordersServices from "../../Services/OrdersServices";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import { errStyle } from "../Auth-Area/Register";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { asPriceNum } from "../../Utils/helpers";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const shipmentCost = 50;

const OrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const phones = useSelector((state: RootState) => state.store.phones);
  const itemsInCart = useSelector((state: RootState) => state.shoppingCart.products);
  const cartId = useSelector((state: RootState) => state.shoppingCart._id);
  const { register, handleSubmit, formState, setValue, unregister, trigger } = useForm<OrderModel>();

  const [order, setOrder] = useState<OrderModel>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | null>(null);
  const [show, setShow] = useState(false);
  const [paypalApproved, setPaypalApproved] = useState(false);
  const [paypalTransactionId, setPaypalTransactionId] = useState<string>("");
  const [{ isPending: isPayPalPending }] = usePayPalScriptReducer();

  const selectCreditCard = () => {
    setPaymentMethod('credit');
    setPaypalApproved(false);
    setPaypalTransactionId("");
    unregister('paymentMethod.paypal');
  };

  const selectPaypal = () => {
    setPaymentMethod('paypal');
    unregister('paymentMethod.creditCard');
  };

  const isGuest = !user ? true : false;
  if (user) {
    setValue('email', user.email);
    setValue('fullName', user.first_name + " " + user.last_name);
  }

  useEffect(() => {
    const calculateTotalPrice = () => {
      let sum = 0;
      itemsInCart.forEach((item) => {
        sum += item.total_price;
      });
      return sum;
    };

    if (itemsInCart) {
      const sum = calculateTotalPrice();
      setTotalPrice(sum);
    }
  }, [itemsInCart]);

  const grandTotal = totalPrice + shipmentCost + (17 / 100) * totalPrice;

  const submit = async (orderToSet: OrderModel) => {
    // If PayPal is selected, we need the paypal approval
    if (paymentMethod === 'paypal') {
      if (!paypalApproved || !paypalTransactionId) {
        notifyService.error("Please complete PayPal payment first");
        return;
      }
      orderToSet.paymentMethod = {
        paypal: { transactionId: paypalTransactionId }
      };
    }

    // Attach product snapshots to the order
    const vatAmount = (17 / 100) * totalPrice;
    orderToSet.products = itemsInCart?.map((item) => {
      const product = getProductByItemId(item.phone_id);
      return {
        phone_id: item.phone_id,
        name: product?.name || 'Unknown Product',
        picture: product?.picture || '',
        price: product?.price || 0,
        amount: item.amount,
        total_price: item.total_price
      };
    }) || [];
    orderToSet.subtotal = totalPrice;
    orderToSet.shippingCost = shipmentCost;
    orderToSet.vat = Number(vatAmount.toFixed(2));
    orderToSet.grandTotal = Number(grandTotal.toFixed(2));

    handleShow();
    try {
      const order = await ordersServices.setNewOrder(orderToSet);
      setOrder(order);

      // Clear the shopping cart after successful order
      if (cartId) {
        await shoppingCartServices.clearShoppingCart(cartId);
      }

      notifyService.success("Order placed successfully!");
    } catch (err: any) {
      notifyService.error("Some error");
    }
  };

  const getProductByItemId = (itemId: string) => {
    return phones.find((phone) => phone._id === itemId);
  };

  const handleClose = () => {
    setShow(false);
    navigate('/');
  };

  const handleShow = () => setShow(true);

  // Validate shipping/user fields before allowing PayPal checkout
  const validateBeforePayPal = async (): Promise<boolean> => {
    const isValid = await trigger(['email', 'fullName', 'zipCode', 'city', 'address']);
    return isValid;
  };

  return (
    <div className="ps-order-page">
      <NavLink to="/cart" className="ps-order-back">
        <FiArrowLeft /> Back to Cart
      </NavLink>

      <div className="ps-order-grid">
        {/* Checkout Form */}
        <div className="ps-order-card">
          <Form onSubmit={handleSubmit(submit)}>
            <h2>Checkout</h2>
            <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Complete your order details below
            </p>

            <h6>User Details</h6>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  disabled={!isGuest}
                  autoFocus
                  placeholder="Email"
                  {...register('email', {
                    required: { value: true, message: "Email is missing" },
                    minLength: { value: 3, message: "Email must be minimum 3 chars" },
                    maxLength: { value: 50, message: "Email can't exceed 50 chars" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                <span style={errStyle}>{formState.errors.email?.message}</span>
              </FloatingLabel>

              <FloatingLabel label="Full Name">
                <Form.Control
                  type="text"
                  maxLength={20}
                  disabled={!isGuest}
                  placeholder="Full Name"
                  {...register('fullName', {
                    required: { value: true, message: "Full name is missing" },
                    minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                    maxLength: { value: 20, message: "Full name can't exceed 20 chars" }
                  })}
                />
                <span style={errStyle}>{formState.errors.fullName?.message}</span>
              </FloatingLabel>
            </div>

            <hr />
            <h6>Shipping Details</h6>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <FloatingLabel label="Zip Code">
                <Form.Control
                  type="tel"
                  maxLength={5}
                  placeholder="Zip Code"
                  {...register('zipCode', {
                    required: { value: true, message: "Zip-code is missing" },
                    minLength: { value: 5, message: "Zip-code must be 5 digits" },
                    maxLength: { value: 5, message: "Zip-code must be 5 digits" },
                    pattern: { value: /^[A-Za-z0-9]+$/i, message: 'Invalid Zip-code' },
                  })}
                />
                <span style={errStyle}>{formState.errors.zipCode?.message}</span>
              </FloatingLabel>

              <FloatingLabel label="City">
                <Form.Control
                  type="text"
                  placeholder="City"
                  {...register('city', {
                    required: { value: true, message: "City is missing" },
                    minLength: { value: 3, message: "City must be minimum 3 chars" },
                    maxLength: { value: 50, message: "City can't exceed 50 chars" }
                  })}
                />
                <span style={errStyle}>{formState.errors.city?.message}</span>
              </FloatingLabel>
            </div>

            <FloatingLabel label="Address">
              <Form.Control
                type="text"
                placeholder="Address"
                {...register('address', {
                  required: { value: true, message: "Address is missing" },
                  minLength: { value: 3, message: "Address must be minimum 3 chars" },
                  maxLength: { value: 70, message: "Address can't exceed 70 chars" }
                })}
              />
              <span style={errStyle}>{formState.errors.address?.message}</span>
            </FloatingLabel>

            <hr />
            <h6>Payment Method</h6>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
              <Form.Check
                inline
                label="Credit Card"
                type="radio"
                name="card"
                required
                onChange={selectCreditCard}
              />
              <Form.Check
                inline
                type="radio"
                label="PayPal"
                name="card"
                required
                onChange={selectPaypal}
              />
            </div>

            {paymentMethod === 'credit' && (
              <>
                <FloatingLabel label="XXXX-XXXX-XXXX-XXXX" className="mb-3">
                  <Form.Control
                    autoFocus
                    type="tel"
                    maxLength={16}
                    placeholder="Card Number"
                    {...register('paymentMethod.creditCard.cardNumber', {
                      required: { value: true, message: "Card number is missing" },
                      minLength: { value: 16, message: "Card number must be 16 digits" },
                      maxLength: { value: 16, message: "Card number must be 16 digits" }
                    })}
                  />
                  <span style={errStyle}>
                    {formState.errors.paymentMethod?.creditCard?.cardNumber?.message}
                  </span>
                </FloatingLabel>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <FloatingLabel label="MM/YY">
                    <Form.Control
                      type="month"
                      placeholder="Exp. Date"
                      {...register('paymentMethod.creditCard.expiredDate', {
                        required: { value: true, message: "Expiry date is missing" },
                        maxLength: { value: 30, message: 'Error' },
                        minLength: { value: 5, message: 'Invalid expiry date' }
                      })}
                    />
                    <span style={errStyle}>
                      {formState.errors.paymentMethod?.creditCard?.expiredDate?.message}
                    </span>
                  </FloatingLabel>

                  <FloatingLabel label="CVC">
                    <Form.Control
                      type="tel"
                      maxLength={3}
                      placeholder="CVC"
                      {...register('paymentMethod.creditCard.securityNumber', {
                        required: { value: true, message: "CVC is missing" },
                        maxLength: { value: 3, message: 'CVC must be 3 digits' },
                        minLength: { value: 3, message: 'CVC must be 3 digits' }
                      })}
                    />
                    <span style={errStyle}>
                      {formState.errors.paymentMethod?.creditCard?.securityNumber?.message}
                    </span>
                  </FloatingLabel>
                </div>

                <Button className="ps-btn-gold w-100 mt-4" type="submit" style={{ padding: '14px' }}>
                  Confirm Order
                </Button>
              </>
            )}

            {paymentMethod === 'paypal' && (
              <div className="ps-paypal-section">
                {/* PayPal approved indicator */}
                {paypalApproved ? (
                  <div className="ps-paypal-approved">
                    <FiCheckCircle size={24} />
                    <div>
                      <strong>PayPal Payment Approved</strong>
                      <p>Transaction ID: {paypalTransactionId}</p>
                    </div>
                  </div>
                ) : (
                  <div className="ps-paypal-buttons-wrapper">
                    <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                      Click the PayPal button below to complete your payment securely.
                    </p>

                    {isPayPalPending ? (
                      <div style={{ textAlign: 'center', padding: '24px' }}>
                        <Spinner animation="border" size="sm" style={{ color: 'var(--ps-gold)' }} />
                        <p style={{ color: 'var(--ps-text-muted)', marginTop: '8px', fontSize: '0.85rem' }}>
                          Loading PayPal...
                        </p>
                      </div>
                    ) : (
                      <PayPalButtons
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "paypal",
                          height: 45
                        }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              amount: {
                                value: grandTotal.toFixed(2),
                                currency_code: "USD"
                              },
                              description: `Phone Store Order - ${itemsInCart?.length || 0} items`
                            }]
                          });
                        }}
                        onApprove={async (data, actions) => {
                          try {
                            const details = await actions.order.capture();
                            const transactionId = details.id || data.orderID;
                            setPaypalTransactionId(transactionId);
                            setPaypalApproved(true);
                            setValue('paymentMethod.paypal.transactionId', transactionId);
                            notifyService.success("PayPal payment approved!");
                          } catch (err: any) {
                            notifyService.error("PayPal payment failed. Please try again.");
                          }
                        }}
                        onError={(err) => {
                          console.error("PayPal error:", err);
                          notifyService.error("PayPal encountered an error. Please try again.");
                        }}
                        onCancel={() => {
                          notifyService.error("PayPal payment was cancelled.");
                        }}
                        onClick={async (data, actions) => {
                          // Validate the form fields before proceeding with PayPal
                          const isValid = await validateBeforePayPal();
                          if (!isValid) {
                            notifyService.error("Please fill in all required fields first.");
                            return actions.reject();
                          }
                          return actions.resolve();
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Show confirm button only after PayPal approval */}
                {paypalApproved && (
                  <Button className="ps-btn-gold w-100 mt-3" type="submit" style={{ padding: '14px' }}>
                    Place Order
                  </Button>
                )}
              </div>
            )}

            {/* Show confirm button when no payment method selected */}
            {paymentMethod === null && (
              <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px' }}>
                Select a payment method to continue
              </p>
            )}
          </Form>
        </div>

        {/* Order Summary */}
        <div className="ps-order-card">
          <h2>Summary</h2>
          <p style={{ color: 'var(--ps-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            {itemsInCart?.length || 0} {itemsInCart?.length === 1 ? 'item' : 'items'}
          </p>

          {itemsInCart === undefined && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spinner animation="border" size="sm" style={{ color: 'var(--ps-gold)' }} />
            </div>
          )}

          <div>
            {itemsInCart?.map((i) => {
              const product = getProductByItemId(i?.phone_id);
              return (
                <div className="ps-order-summary-item" key={i.phone_id}>
                  <img src={product?.picture} alt={product?.name || ''} />
                  <div className="ps-summary-info">
                    <div className="ps-summary-name">{product?.name}</div>
                    <div className="ps-summary-qty">
                      ${asPriceNum(product?.price)} &times; {i?.amount}
                    </div>
                  </div>
                  <div className="ps-summary-price">
                    ${asPriceNum((product?.price || 0) * i?.amount)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ps-order-totals">
            <div className="ps-totals-row">
              <span>Subtotal</span>
              <span>${asPriceNum(totalPrice)}</span>
            </div>
            <div className="ps-totals-row">
              <span>Shipping</span>
              <span>${asPriceNum(shipmentCost)}</span>
            </div>
            <div className="ps-totals-row">
              <span>VAT (17%)</span>
              <span>${((17 / 100) * totalPrice).toFixed(2)}</span>
            </div>
            <div className="ps-totals-row ps-totals-grand">
              <span>Total</span>
              <span>${asPriceNum(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <OrderConfirm show={show} handleClose={handleClose} order={order} />
    </div>
  );
};

export default OrderPage;
