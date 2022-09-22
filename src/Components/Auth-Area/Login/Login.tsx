import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentials-model";
import { authStore } from "../../../Redux/Store";
import { authServices } from "../../../Services/AuthServices";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import { Button, Form } from "react-bootstrap";


function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    
    async function submit(credentials: CredentialsModel) {
        try {
            await authServices.login(credentials);
            notifyService.success("Your in...");
            navigate("/");
            
        } catch (err: any) {
            notifyService.error(err);
        }
    }
    
    useEffect(() => {
        const user = authStore.getState().user;
        if (user) {
            notifyService.error("Your already logged-in.");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="Login">
                <h1>Login Page</h1>

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
        </div>
    );
}

export default Login;
