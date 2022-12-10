import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";
import {NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../Models/credentials-model";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";
import { formStyle, errStyle } from "./Register";

const Login = () => {
      const navigate = useNavigate();
      const { register, handleSubmit, formState } = useForm<CredentialsModel>();

      const submit = async (credentials: CredentialsModel) => {
            try {
                  await authServices.login(credentials);
                  notifyService.success('Your In');
                  navigate('/');
            } catch (err: any) {
                  notifyService.error(err);
            }
      };

      return (
            <Form noValidate style={formStyle} onSubmit={handleSubmit(submit)}>
                  <h1>
                        Login
                  </h1>

                  <FloatingLabel label={"Email"} className="mt-2 mb-2">
                        <Form.Control type="email" autoFocus required {...register('email', {
                              required: { value: true, message: "Email is missing" },
                              minLength: { value: 3, message: "Email must be minimum 3 chars" },
                              maxLength: { value: 50, message: "Email can't exceed 50 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.email?.message}
                        </span>
                  </FloatingLabel>

                  <FloatingLabel label={"Password"} className="mt-2 mb-2">
                        <Form.Control type="password" required {...register('password', {
                              required: { value: true, message: "Password is missing" },
                              minLength: { value: 3, message: "Password must be minimum 3 chars" },
                              maxLength: { value: 20, message: "Password can't exceed 20 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.password?.message}
                        </span>
                  </FloatingLabel>

                  <Button variant="success" type="submit">
                        Login <AiOutlineArrowRight />
                  </Button>


                  <Form.Text>
                        <hr />
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
      )
}

export default Login;