import { Card, Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../../Models/phone-model";
import "./PhoneCard.css";

interface PhoneCardProps {
    phone: PhoneModel
}

function PhoneCard(props: PhoneCardProps): JSX.Element {

    // async function getBrandName(brandId: string) {
    //     const brands = await storeServices.getAllBrands();
    //     return brands?.find(b => b.brandId === brandId).brand;
    // }

    return (
        <Card className="Card">

            <Carousel variant="dark">
                <Carousel.Item>
                    <NavLink to={"/phone-details/" + props.phone.phoneId}>
                        <Card.Img variant="top" src={props.phone.picture} className="img" />
                    </NavLink>
                </Carousel.Item>
                <Carousel.Item>
                    <NavLink to={"/phone-details/" + props.phone.phoneId}>
                        <Card.Img variant="top" src={props.phone.picture} className="img" />
                    </NavLink>
                </Carousel.Item>
                <Carousel.Item>
                    <NavLink to={"/phone-details/" + props.phone.phoneId}>
                        <Card.Img variant="top" src={props.phone.picture} className="img" />
                    </NavLink>
                </Carousel.Item>
            </Carousel>
            <Card.Body>
                <Card.Title>{props.phone.name}</Card.Title>
                <Card.Subtitle>{props.phone.brandId}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default PhoneCard;
