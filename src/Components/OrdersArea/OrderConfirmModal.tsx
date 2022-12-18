import { useCallback, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OrderModel from "../../Models/order-model"
import notifyService from "../../Services/NotifyService";


interface OrderConfirmProps {
      show: boolean;
      handleClose: any
      order: OrderModel;
}

const OrderConfirm = (props: OrderConfirmProps) => {
      const [success, setSuccess] = useState<boolean>();

      const orderConfirm = useCallback(async () => {
            try {
                  setSuccess(true);
            } catch (err: any) {
                  setSuccess(false);
                  notifyService.error(err);
            }
      }, []);

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
                                          {new Date(props.order?.receivingDeliveryDate).toDateString()}
                                    </p>
                              </>

                        }
                  </Modal.Body>
            </Modal>
      )
}

export default OrderConfirm