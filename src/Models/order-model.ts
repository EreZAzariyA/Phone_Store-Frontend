interface paymentMethodInterface {
      creditCard?: {
            cardNumber: number;
            expiredDate: {
                  mm: number;
                  yyyy: number;
            };
            securityNumber: number;
      },
      paypal?: {
            unknown: string;
      }


}

class OrderModel {
      public email: string;
      public fullName: string;
      public zipCode: number;
      public city: string;
      public address: string;
      public paymentMethod: paymentMethodInterface;
}
export default OrderModel;