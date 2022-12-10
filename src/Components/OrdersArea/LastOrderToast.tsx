import { Toast } from "react-bootstrap";
import OrderModel from "../../Models/order-model";

interface LastOrderProps {
      order: OrderModel;
}

const LastOrder = (props: LastOrderProps) => {

      return (
            <Toast className="mt-2">
                  <p>From: {new Date(props.order?.orderDate)?.toDateString()}</p>
                  <p>Until: {new Date(props.order?.receivingDeliveryDate)?.toDateString()}</p>
            </Toast>
      )
}

export default LastOrder;