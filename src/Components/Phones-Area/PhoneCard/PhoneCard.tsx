import { Card } from "react-bootstrap";
import { PhoneModel } from "../../../Models/phone-model";
import storeServices from "../../../Services/SocialServices";
import "./PhoneCard.css";

interface PhoneCardProps {
    phone: PhoneModel
}

function PhoneCard(props: PhoneCardProps): JSX.Element {

    async function getBrandName(brandId: string) {
        const brands = await storeServices.getAllBrands();
        return brands?.find(b => b.brandId === brandId).brand;
    }

    return (
        <Card className="Card">
            <Card.Img variant="top" src={props.phone.picture} />
            <Card.Body>
                <Card.Title>{props.phone.name}</Card.Title>
                <Card.Subtitle>{getBrandName(props.phone.brandId))}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default PhoneCard;
