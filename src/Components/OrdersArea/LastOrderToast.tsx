import OrderModel from "../../Models/order-model";

interface LastOrderProps {
  order: OrderModel;
}

const LastOrder = (props: LastOrderProps) => {
  return (
    <div className="ps-order-toast">
      <p>
        <span style={{ color: 'var(--ps-text-muted)' }}>From:</span>{' '}
        {new Date(props.order?.orderDate)?.toDateString()}
      </p>
      <p>
        <span style={{ color: 'var(--ps-text-muted)' }}>Until:</span>{' '}
        {new Date(props.order?.receivingDeliveryDate)?.toDateString()}
      </p>
    </div>
  );
};

export default LastOrder;
