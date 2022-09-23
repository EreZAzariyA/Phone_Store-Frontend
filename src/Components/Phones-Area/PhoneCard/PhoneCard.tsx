import { Button, ButtonGroup, Card, Carousel, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../../Models/phone-model";
import { authStore, shoppingCartStore, store } from "../../../Redux/Store";
import "./PhoneCard.css";
import UserModel from "../../../Models/user-model";
import shoppingCartServices from "../../../Services/ShoppingCartsServices";
import ItemInCartModel from "../../../Models/item-in-cart model";
import notifyService from "../../../Services/NotifyService";

interface PhoneCardProps {
    phone: PhoneModel
}

function PhoneCard(props: PhoneCardProps): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [inCart, setInCart] = useState(false);
    const [show, setShow] = useState(false);
    const [stock, setStock] = useState(1);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const addToCart = async () => {
        setShow(false);
        const itemToAdd = new ItemInCartModel();
        itemToAdd.cartId = shoppingCartStore.getState().shoppingCart?.cartId;
        itemToAdd.phoneId = props.phone.phoneId;
        itemToAdd.stock = stock;
        itemToAdd.totalPrice = stock * props.phone.price;
        if (shoppingCartStore.getState().itemsInCart?.find(i => i.phoneId === props.phone.phoneId)) {
            alert("Need to update");
        }
        await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
        setInCart(true);
        notifyService.success("Added")
    };

    useEffect(() => {
        const user = authStore.getState().user;
        setUser(user);
        if (user) {
            const orderedStock = shoppingCartStore.getState().itemsInCart?.find(i => i.phoneId === props.phone.phoneId)?.stock;
            if (orderedStock) {
                setStock(orderedStock);
                setInCart(true);
            }
        }

        const unsubscribe = authStore.subscribe(() => {
            const user = authStore.getState().user;
            setUser(user);
        });
        const unsubscribeMeTo = shoppingCartStore.subscribe(() => {
            if (user) {
                const orderedStock = shoppingCartStore.getState().itemsInCart?.find(i => i.phoneId === props.phone.phoneId)?.stock;
                if (orderedStock) {
                    setStock(orderedStock);
                    setInCart(true);
                }
            }
        })

        return () => {
            unsubscribe()
            unsubscribeMeTo()
        }
    }, []);

    function getBrandName(brandId: string) {
        const brands = store.getState().brands
        return brands?.find(b => b.brandId === brandId)?.brand;
    }

    function plus() {
        setStock(stock + 1);
    }
    function minus() {
        if (stock === 1) {
            return
        };
        setStock(stock - 1);

    }

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
                    <Card.Text>
                        {props.phone.description}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Card.Text>
                </Card.Body>

                <Card.Footer>
                    <NavLink to={"/"}>
                        {!inCart &&
                            <Button variant="primary" onClick={handleShow}>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.phone?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Set Stock To Order</Modal.Title>
                    <ButtonGroup>
                        <Button variant="success" onClick={plus}>
                            <strong>+</strong>
                        </Button>
                        <h1 style={{ margin: '10px' }}>{stock}</h1>
                        <Button variant="danger" onClick={minus}>
                            <strong>–</strong>
                        </Button>
                    </ButtonGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addToCart}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PhoneCard;
