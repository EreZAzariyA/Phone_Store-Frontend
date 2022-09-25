import { useEffect, useState } from "react";
import { Button, Container, Form, Offcanvas, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../..";
import CredentialsModel from "../../../Models/credentials-model";
import ItemInCartModel from "../../../Models/item-in-cart model";
import { PhoneModel } from "../../../Models/phone-model";
import ShoppingCartModel from "../../../Models/shopping-cart model";
import UserModel from "../../../Models/user-model";
import { authStore, shoppingCartStore, store } from "../../../Redux/Store";
import { authServices } from "../../../Services/AuthServices";
import notifyService from "../../../Services/NotifyService";
import "./Sidenav.css";

function Sidenav(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [shoppingCart, setShoppingCart] = useState<ShoppingCartModel>();
    const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        setShoppingCart(shoppingCartStore.getState().shoppingCart);
        setItemsInCart(shoppingCartStore.getState().itemsInCart);

    const unsubscribe = authStore.subscribe(() => {
        setUser(authStore.getState().user)
    });
    const unsubscribeMeTo = shoppingCartStore.subscribe(() => {
        setShoppingCart(shoppingCartStore.getState().shoppingCart);
        setItemsInCart(shoppingCartStore.getState().itemsInCart);
    });
    return () => {
        unsubscribe()
        unsubscribeMeTo()
    }
}, []);

const getPhoneFromCartByPhoneId = (phoneId: string) => {
    const phone: PhoneModel = store.getState().phones?.find(p => p.phoneId === phoneId)
    return phone;
};


async function submit(credentials: CredentialsModel) {
    try {
        await authServices.login(credentials);
        notifyService.success("Your in...");
        navigate("/");

    } catch (err: any) {
        notifyService.error(err);
    }
}


return (
    <Container fluid>
        {user &&
            <>
                <Offcanvas.Header closeButton>
                    <h4>
                        Hello {user?.firstName + " " + user?.lastName}
                    </h4>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {itemsInCart?.length === 0 &&
                        <>
                            <h1>You still don`t have items</h1>
                        </>
                    }
                    {
                        itemsInCart?.length > 0 &&
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price Per One</th>
                                    <th>Stock</th>
                                    <th>Price Per Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsInCart?.map(item =>
                                    
                                        <tr key={item.phoneId}>
                                            <td>{getPhoneFromCartByPhoneId(item?.phoneId)?.name}</td>
                                            <td>{numberWithCommas(getPhoneFromCartByPhoneId(item?.phoneId)?.price)}₪</td>
                                            <td>{item?.stock}</td>
                                            <td>{numberWithCommas(getPhoneFromCartByPhoneId(item?.phoneId)?.price * item?.stock)}₪</td>
                                        </tr>
                                    
                                )}
                                <tr>
                                    <td>Total price</td>

                                </tr>

                            </tbody>
                        </Table>
                    }
                </Offcanvas.Body>

            </>
        }
        {!user &&
            <>
                <Offcanvas.Header>
                    <h4>Hello Guest</h4>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Offcanvas.Title>
                        <p>
                            Please login to see your cart
                            details
                        </p>
                    </Offcanvas.Title>
                    <Form onSubmit={handleSubmit(submit)}>

                        <Form.Group className="mb-2">

                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register("password")} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                        <Form.Text>
                            <p style={{ marginTop: "5px" }}>
                                Don`t have account?
                                <span style={{ marginLeft: "5px" }}>
                                    <NavLink to={"/auth/register"}>
                                        Register
                                    </NavLink>
                                </span>
                            </p>
                        </Form.Text>
                    </Form>

                </Offcanvas.Body>
            </>
        }
    </Container>
);
}

export default Sidenav;
