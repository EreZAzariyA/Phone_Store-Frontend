import { SyntheticEvent, useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Form, Offcanvas, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../..";
import CredentialsModel from "../../../Models/credentials-model";
import ItemInCartModel from "../../../Models/item-in-cart model";
import { PhoneModel } from "../../../Models/phone-model";
import Role from "../../../Models/role";
import ShoppingCartModel from "../../../Models/shopping-cart model";
import UserModel from "../../../Models/user-model";
import { updateItemInCartAction } from "../../../Redux/ShoppingCartState";
import { authStore, shoppingCartStore, store } from "../../../Redux/Store";
import { authServices } from "../../../Services/AuthServices";
import notifyService from "../../../Services/NotifyService";
import shoppingCartServices from "../../../Services/ShoppingCartsServices";
import "./Sidenav.css";

function Sidenav(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [shoppingCart, setShoppingCart] = useState<ShoppingCartModel>();
    const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
    const [totalPrice, setTotalPrice] = useState(0);

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    const getTotalPrice = (items: ItemInCartModel[]) => {
        const sum: number[] = [];

        items?.forEach(i => {
            const p = getPhoneFromCartByPhoneId(i?.phoneId)?.price;
            sum?.push(p * i?.stock);

        });
        return setTotalPrice(sum?.reduce((a, b) => a + b, 0))
    }

    useEffect(() => {
        setUser(authStore.getState().user);
        setShoppingCart(shoppingCartStore.getState().shoppingCart);
        setItemsInCart(shoppingCartStore.getState().itemsInCart);
        getTotalPrice(itemsInCart);


        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        });
        const unsubscribeMeTo = shoppingCartStore.subscribe(async () => {
            const user = authStore.getState().user;
            setUser(user);
            const shoppingCart = await shoppingCartServices.getShoppingCartByUserId(user?.userId);
            setShoppingCart(shoppingCart);
            const itemsInCart = await shoppingCartServices.getItemsFromCartByCartId(shoppingCart?.cartId);
            setItemsInCart(itemsInCart);
            getTotalPrice(itemsInCart);
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

    async function plus(e: SyntheticEvent) {
        const phoneId = (e.target as HTMLInputElement).value;
        alert(phoneId);
    }

    async function minus(e: SyntheticEvent) {
        const phoneId = (e.target as HTMLInputElement).value;
        alert(phoneId);
    }


    return (
        <Container className="sideNav">
            {user?.roleId === Role?.User &&
                <>
                    <Row>

                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>

                                Hello {user?.firstName + " " + user?.lastName}
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body id="offcanvas-body">
                            {itemsInCart?.length === 0 &&
                                <>
                                    <h1>You still don`t have items</h1>
                                </>
                            }

                            {
                                itemsInCart?.length > 0 &&
                                <>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price Per One</th>
                                                <th>Stock</th>
                                                <th>Price Per Stock</th>
                                                <th>Picture</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsInCart?.map(item =>

                                                <tr key={item.phoneId}>
                                                    <td>
                                                        {getPhoneFromCartByPhoneId(item?.phoneId)?.name}
                                                    </td>
                                                    <td>
                                                        {numberWithCommas(getPhoneFromCartByPhoneId(item?.phoneId)?.price)}₪
                                                    </td>
                                                    <td className="stockBtn">

                                                        <ButtonGroup>
                                                            <Button
                                                                size="sm"
                                                                variant="success"
                                                                onClick={plus} value={item?.phoneId}>
                                                                +
                                                            </Button>
                                                            <strong>
                                                                {item?.stock}
                                                            </strong>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                onClick={minus}
                                                                value={item?.phoneId}>
                                                                -
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                    <td>
                                                        {numberWithCommas(getPhoneFromCartByPhoneId(item?.phoneId)?.price * item?.stock)}₪
                                                    </td>
                                                    <td>
                                                        <img src={getPhoneFromCartByPhoneId(item?.phoneId)?.picture} alt="" className="phoneImg" />
                                                    </td>
                                                </tr>
                                            )}

                                            <tr>
                                                <td colSpan={2}>Total price</td>
                                                <td colSpan={3}>{numberWithCommas(totalPrice)}₪</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                    <p>
                                        Continue to order
                                    </p>
                                    <NavLink to={"/order"}>
                                        <Button variant="success">

                                            Order
                                        </Button>
                                    </NavLink>
                                </>
                            }
                        </Offcanvas.Body>

                    </Row>
                </>
            }
            
            {user?.roleId === Role?.Admin &&
                <>
                    <Row>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                Hello Admin {user?.firstName + " " + user?.lastName}

                            </Offcanvas.Title>
                        </Offcanvas.Header>
                    </Row>
                </>
            }

            {!user &&
                <>
                    <Offcanvas.Header closeButton>
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
