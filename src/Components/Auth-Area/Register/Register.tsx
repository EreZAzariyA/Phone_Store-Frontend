import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/Store";
import { authServices } from "../../../Services/AuthServices";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authServices.register(user);
            notifyService.success("registered...");
            navigate("/");
        } catch (err: any) {
            notifyService.error(err.message);
        }
    }

    useEffect(() => {
        const user = authStore.getState().user;
        if (user) {
            notifyService.error("Your already registered");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="Register">
                <h1>Register Page</h1>

            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-2">
                    <Form.Label htmlFor="firstName">First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" {...register("firstName")} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" {...register("lastName")} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" placeholder="******" {...register("password")} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>

                <Form.Text>
                    <p style={{ marginTop: "5px" }}>
                        Already have account?
                        <span style={{ marginLeft: "5px" }}>
                            <NavLink to={"/auth/login"}>
                                Login
                            </NavLink>
                        </span>
                    </p>
                </Form.Text>
            </Form>
        </div>
    );
}

export default Register;
