import { useEffect, useState } from "react";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentials-model";
import ShoppingCartModel from "../../../Models/shopping-cart model";
import UserModel from "../../../Models/user-model";
import { authStore, shoppingCartStore } from "../../../Redux/Store";
import { authServices } from "../../../Services/AuthServices";
import notifyService from "../../../Services/NotifyService";
import "./Sidenav.css";

function Sidenav(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [shoppingCart, setShoppingCart] = useState<ShoppingCartModel>();
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        setShoppingCart(shoppingCartStore.getState().shoppingCart);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        });
        const unsubscribeMeTo = shoppingCartStore.subscribe(() => {
            setShoppingCart(shoppingCartStore.getState().shoppingCart);
        })

        return () => {
            unsubscribe()
            unsubscribeMeTo()
        }
    }, []);


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
                    <Offcanvas.Header>
                        <h4>
                            Hello {user?.firstName + " " + user?.lastName}
                        </h4>
                        <p>

                            {shoppingCart?.userId}
                        </p>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae, nostrum voluptas provident maxime nisi officia sint dolor earum harum voluptatum vitae quod impedit vel, ut sit quo ab ipsam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae, nostrum voluptas provident maxime nisi officia sint dolor earum harum voluptatum vitae quod impedit vel, ut sit quo ab ipsam.
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
