import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
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
      <h2 style={{ textAlign: 'center', marginBottom: '4px' }}>
        Welcome Back
      </h2>
      <p style={{ color: 'var(--ps-text-muted)', textAlign: 'center', fontSize: '0.9rem', marginBottom: '28px' }}>
        Sign in to your account
      </p>

      <FloatingLabel label="Email" className="mb-3">
        <Form.Control type="email" autoFocus required placeholder="Email" {...register('email', {
          required: { value: true, message: "Email is missing" },
          minLength: { value: 3, message: "Email must be minimum 3 chars" },
          maxLength: { value: 50, message: "Email can't exceed 50 chars" }
        })} />
        <span style={errStyle}>{formState.errors.email?.message}</span>
      </FloatingLabel>

      <FloatingLabel label="Password" className="mb-4">
        <Form.Control type="password" required placeholder="Password" {...register('password', {
          required: { value: true, message: "Password is missing" },
          minLength: { value: 3, message: "Password must be minimum 3 chars" },
          maxLength: { value: 20, message: "Password can't exceed 20 chars" }
        })} />
        <span style={errStyle}>{formState.errors.password?.message}</span>
      </FloatingLabel>

      <Button className="ps-btn-gold w-100" type="submit" style={{ padding: '12px' }}>
        Login <AiOutlineArrowRight />
      </Button>

      <hr style={{ borderColor: 'var(--ps-border)', marginTop: '24px' }} />
      <p style={{ color: 'var(--ps-text-secondary)', textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>
        Don't have an account?{' '}
        <NavLink to="/auth/register" style={{ color: 'var(--ps-gold)', textDecoration: 'none' }}>
          Register
        </NavLink>
      </p>
    </Form>
  );
};

export default Login;
