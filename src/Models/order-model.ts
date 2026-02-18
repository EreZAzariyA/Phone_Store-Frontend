interface paymentMethodInterface {
      creditCard?: {
            cardNumber: number;
            expiredDate: Date;
            securityNumber: number;
      },
      paypal?: {
            transactionId: string;
      }
}

export interface OrderProductInterface {
      phone_id: string;
      name: string;
      picture: string;
      price: number;
      amount: number;
      total_price: number;
}

class OrderModel {
      public orderId: string;
      public email: string;
      public fullName: string;
      public zipCode: number;
      public city: string;
      public address: string;
      public paymentMethod: paymentMethodInterface;
      public status: string;
      public products: OrderProductInterface[];
      public subtotal: number;
      public shippingCost: number;
      public vat: number;
      public grandTotal: number;
      public orderDate: Date;
      public receivingDeliveryDate: Date;
}

export default OrderModel;
