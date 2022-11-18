import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import UserModel from "../../Models/user-model";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";

export const formStyle = {
      width: '400px',
      margin: 'auto',
      marginTop: '20px',
      borderRadius: '10px',
      backgroundColor: 'lightGray'
}
export const errStyle = {
      color: 'red'
}

const Register = () => {
      const navigate = useNavigate();
      const { register, handleSubmit, formState } = useForm<UserModel>();

      const submit =async (user: UserModel) => {
            try {
                  await authServices.register(user);
                  notifyService.success("Your in...");
                  navigate('/');
            } catch (err: any) {
                  notifyService.error(err);
            }
      };

      return (
            <Form noValidate style={formStyle} onSubmit={handleSubmit(submit)}>

                  <Form.Text>
                        <h1 style={{ color: 'black' }}>
                              Register
                        </h1>
                        <p>
                              We'll never share your details with anyone else.
                        </p>
                  </Form.Text>


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

                  <FloatingLabel label='First Name' className="mt-2">
                        <Form.Control type="text" {...register('firstName', {
                              required: { value: true, message: "First name is missing" },
                              minLength: { value: 3, message: "First name must be minimum 3 chars" },
                              maxLength: { value: 50, message: "First name can't exceed 50 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.firstName?.message}
                        </span>
                  </FloatingLabel>

                  <FloatingLabel label={"Last Name"} className="mt-2 mb-2">
                        <Form.Control type="text" required {...register('lastName', {
                              required: { value: true, message: "Last name is missing" },
                              minLength: { value: 3, message: "Last name must be minimum 3 chars" },
                              maxLength: { value: 50, message: "Last name can't exceed 50 chars" }
                        })} />

                        <span className="mb-2" style={errStyle}>
                              {formState.errors.lastName?.message}
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
                        Register <AiOutlineArrowRight />
                  </Button>


                  <Form.Text>
                        <hr />
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

      )
}
export default Register;