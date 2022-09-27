import { Button, Card, Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../../Models/phone-model";
import { authStore, shoppingCartStore } from "../../../Redux/Store";
import "./PhoneCard.css";
import UserModel from "../../../Models/user-model";
import MyModal from "../MyModal";
import { getBrandName } from "../../..";
import StarRatings from 'react-star-ratings';

interface PhoneCardProps {
    phone: PhoneModel
}

function PhoneCard(props: PhoneCardProps): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [inCart, setInCart] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    useEffect(() => {
        setUser(authStore.getState().user);
        if (user) {
            const itemsInCart = shoppingCartStore.getState().itemsInCart;
            const item = itemsInCart?.find(i => i.phoneId === props.phone.phoneId);
            if (item) {
                setInCart(true);
            }
        }


        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        const unsubscribeMeTo = shoppingCartStore.subscribe(() => {
            if (user) {
                const itemsInCart = shoppingCartStore.getState().itemsInCart;
                const item = itemsInCart?.find(i => i.phoneId === props.phone.phoneId);
                if (item) {
                    setInCart(true);
                }
            }

        })
        return () => {
            unsubscribe()
            unsubscribeMeTo()
        }

    }, [user, props.phone]);

    return (
        <>
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
                        <StarRatings
                            key={props.phone.phoneId}
                            rating={props.phone.rating}
                            starRatedColor="yellow"
                            starDimension="20px" />
                    <Card.Text>
                        {props.phone.description}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Card.Text>
                </Card.Body>

                <Card.Footer>
                    <NavLink to={"/"}>
                        {!inCart &&
                            <Button variant="primary" disabled={!user} onClick={handleShow}>
                                Add To Cart
                            </Button>
                        }
                        {inCart &&
                            <Button variant="success" onClick={handleShow}>
                                In-Cart ✔
                            </Button>
                        }
                    </NavLink>

                </Card.Footer>
            </Card>

            <MyModal phone={props.phone} show={show} close={handleClose} save={handleClose} />
        </>
    );
}

export default PhoneCard;
