import { Button, Card, Carousel } from "react-bootstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../../Models/phone-model";
import { store } from "../../../Redux/Store";
import "./PhoneCard.css";

interface PhoneCardProps {
    phone: PhoneModel
}

function PhoneCard(props: PhoneCardProps): JSX.Element {

    const [inCart, setInCart] = useState(false);

    function getBrandName(brandId: string) {
        const brands = store.getState().brands
        return brands?.find(b => b.brandId === brandId)?.brand;
    }

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
                <Card.Title>
                    {props.phone.name}
                </Card.Title>
                <Card.Subtitle>
                    {getBrandName(props.phone.brandId)}
                </Card.Subtitle>
                <Card.Text>
                    {props.phone.description}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <NavLink to={"/"}>
                    {!inCart &&
                        <Button variant="primary">
                            Add To Cart
                        </Button>
                    }
                    {inCart &&
                        <Button variant="success">
                            In-Cart ✔
                        </Button>
                    }
                </NavLink>
            </Card.Footer>
        </Card>
    );
}

export default PhoneCard;
