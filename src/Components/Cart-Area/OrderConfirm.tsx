import { useCallback, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OrderModel from "../../Models/order-model"


interface OrderConfirmProps {
      show: boolean;
      handleClose: any
      order: OrderModel;
}

const OrderConfirm = (props: OrderConfirmProps) => {

      const [success, setSuccess] = useState<boolean>();

      const orderConfirm = useCallback(async () => {
            // try {
            //       // Code
            //       setSuccess(true);
            // } catch (err: any) {
            //       setSuccess(false);
            //       notifyService.error(err);
            // }
      }, []);

      useEffect(() => {
            orderConfirm();
      });

      return (
            <Modal show={props.show} onHide={props.handleClose} centered>
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
                        {success === true &&
                              <span className="form-control is-valid">Order Confirmed Successfully</span>
                        }
                  </Modal.Body>
            </Modal>
      )
}

export default OrderConfirm