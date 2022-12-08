
interface CreditCardProps {
      name: string;
      number: number;
      expDate: number;
      cvc: number;
}

const CreditCard = (props: CreditCardProps) => {
      // return (
      //       <Cards cvc={props?.cvc.toString()} expiration={props?.expDate?.toString()} name={props?.name} number={props?.number?.toString()} />
      // )
}

export default CreditCard;