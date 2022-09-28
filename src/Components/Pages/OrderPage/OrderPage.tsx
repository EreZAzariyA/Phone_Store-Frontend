import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ItemInCartModel from "../../../Models/item-in-cart model";
import UserModel from "../../../Models/user-model";
import { authStore, shoppingCartStore } from "../../../Redux/Store";
import storeServices from "../../../Services/StoreServices";
import PhoneInCartCard from "../../Phones-Area/PhoneInCartCard/PhoneInCartCard";
import "./OrderPage.css";

function OrderPage(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>();
    const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

    const getData = async () => {
        await storeServices?.getAllPhones();
    }
    useEffect(() => {
        getData();
        setUser(authStore.getState().user);
        const itemsInCart = shoppingCartStore.getState().itemsInCart;
        setItemsInCart(itemsInCart)

        const unsubscribe = shoppingCartStore.subscribe(() => {
            setUser(authStore.getState().user);
            const itemsInCart = shoppingCartStore.getState().itemsInCart;
            setItemsInCart(itemsInCart)
        });

        return () => unsubscribe();
    }, []);

    return (
        <Container>
            <h1>Order Page</h1>
            <Row>
                <Col sm={6}>
                    <Form>
                        <Form.FloatingLabel
                            label={"Address"}
                            className="mb-3">
                            <Form.Control type="text" placeholder="Address" />
                        </Form.FloatingLabel>
                    </Form>
                </Col>
                <Col sm={6}>
                    {itemsInCart?.map(item =>
                        <PhoneInCartCard key={item.phoneId} phone={item}/>
                        )}

                </Col>
            </Row>
        </Container>
    );
}

export default OrderPage;
