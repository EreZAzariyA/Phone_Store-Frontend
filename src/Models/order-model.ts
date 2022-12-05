interface paymentMethodInterface {
      creditCard?: {
            cardNumber: number;
            expiredDate: Date;
            securityNumber: number;
      },
      paypal?: {
            unknown: string;
      }
}

class OrderModel {
      public orderId: string;
      public email: string;
      public fullName: string;
      public zipCode: number;
      public city: string;
      public address: string;
      public paymentMethod: paymentMethodInterface;
      public orderDate: Date;
      public receivingDeliveryDate: Date;
}

export default OrderModel;