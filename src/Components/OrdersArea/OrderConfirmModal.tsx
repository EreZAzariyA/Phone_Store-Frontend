import { useCallback, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OrderModel from "../../Models/order-model"
import notifyService from "../../Services/NotifyService";
import { FiCheck } from "react-icons/fi";

interface OrderConfirmProps {
  show: boolean;
  handleClose: any;
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
    <Modal
      show={props.show}
      onShow={orderConfirm}
      onHide={props.handleClose}
      centered
      dialogClassName="ps-order-modal"
    >
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--ps-border)' }} />
      <Modal.Body style={{ textAlign: 'center', padding: '32px' }}>

        {success === undefined && (
          <div>
            <Spinner
              animation="border"
              role="status"
              style={{ color: 'var(--ps-gold)', marginBottom: '12px' }}
            />
            <br />
            <span style={{ color: 'var(--ps-text-secondary)' }}>Processing your order...</span>
          </div>
        )}

        {success === false && (
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: 'rgba(248, 113, 113, 0.1)', border: '2px solid rgba(248, 113, 113, 0.3)',
              color: '#f87171', fontSize: '1.5rem', marginBottom: '16px'
            }}>
              !
            </div>
            <p style={{ color: 'var(--ps-text-secondary)', marginTop: '8px' }}>
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {success && (
          <div>
            <div className="ps-modal-success">
              <FiCheck />
            </div>
            <h4 style={{ marginBottom: '8px' }}>Order Confirmed</h4>
            <p style={{ color: 'var(--ps-text-secondary)', fontSize: '0.9rem' }}>
              Your order will arrive by:
              <br />
              <strong style={{ color: 'var(--ps-gold)' }}>
                {new Date(props.order?.receivingDeliveryDate).toDateString()}
              </strong>
            </p>
          </div>
        )}

      </Modal.Body>
    </Modal>
  );
};

export default OrderConfirm;
