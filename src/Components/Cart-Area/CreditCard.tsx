import Cards from "react-credit-cards";

interface CreditCardProps {
      name: string;
      number: number;
      expDate: number;
      cvc: number;
}

const CreditCard = (props: CreditCardProps) => {
      return (
            <Cards cvc={props?.cvc} expiry={props?.expDate} name={props?.name} number={props?.number} />
      )
}

export default CreditCard;