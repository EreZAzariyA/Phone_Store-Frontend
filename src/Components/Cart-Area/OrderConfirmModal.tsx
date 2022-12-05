import { useCallback, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OrderModel from "../../Models/order-model"
import notifyService from "../../Services/NotifyService";
import ordersServices from "../../Services/OrdersServices";


interface OrderConfirmProps {
      show: boolean;
      handleClose: any
      order: OrderModel;
}

const OrderConfirm = (props: OrderConfirmProps) => {

      const [success, setSuccess] = useState<boolean>();
      const [order, setOrder] = useState<OrderModel>();

      const orderConfirm = useCallback(async () => {
            try {
                  const order = await ordersServices.setNewOrder(props.order);
                  setOrder(order);
                  setSuccess(true);

            } catch (err: any) {
                  setSuccess(false);
                  notifyService.error(err);
            }
      }, [props.order]);



      return (
            <Modal show={props.show} onShow={orderConfirm} onHide={props.handleClose} centered>
                  <Modal.Header closeButton />
                  <Modal.Body>

                        {success === undefined &&
                              <>
                                    <Spinner animation="border" role="status">
                                    </Spinner>
                                    <br />
                                    <span>Loading...</span>
                              </>
                        }

                        {success === false &&
                              <span>Some error</span>
                        }
                        {success &&
                              <>
                                    <span className="form-control is-valid">
                                          Order Confirmed Successfully
                                    </span>
                                    <p>
                                          Your order will be get to you at:
                                          <br />
                                          {new Date(order?.receivingDeliveryDate).toDateString()}
                                    </p>
                              </>

                        }
                  </Modal.Body>
            </Modal>
      )
}

export default OrderConfirm