import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import UserModel from "../../Models/user-model";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";

export const formStyle: React.CSSProperties = {
  maxWidth: '440px',
  margin: '40px auto',
  padding: '40px 32px',
  borderRadius: '16px',
  backgroundColor: 'var(--ps-card)',
  border: '1px solid var(--ps-border)',
};

export const errStyle: React.CSSProperties = {
  color: '#f87171',
  fontSize: '0.8rem',
};

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<UserModel>();

  const submit = async (user: UserModel) => {
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
      <h2 style={{ textAlign: 'center', marginBottom: '4px' }}>
        Create Account
      </h2>
      <p style={{ color: 'var(--ps-text-muted)', textAlign: 'center', fontSize: '0.9rem', marginBottom: '28px' }}>
        We'll never share your details with anyone else.
      </p>

      <FloatingLabel label="Email" className="mb-3">
        <Form.Control type="email" autoFocus required placeholder="Email" {...register('email', {
          required: { value: true, message: "Email is missing" },
          minLength: { value: 3, message: "Email must be minimum 3 chars" },
          maxLength: { value: 50, message: "Email can't exceed 50 chars" }
        })} />
        <span style={errStyle}>{formState.errors.email?.message}</span>
      </FloatingLabel>

      <FloatingLabel label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="First Name" {...register('first_name', {
          required: { value: true, message: "First name is missing" },
          minLength: { value: 3, message: "First name must be minimum 3 chars" },
          maxLength: { value: 50, message: "First name can't exceed 50 chars" }
        })} />
        <span style={errStyle}>{formState.errors.first_name?.message}</span>
      </FloatingLabel>

      <FloatingLabel label="Last Name" className="mb-3">
        <Form.Control type="text" required placeholder="Last Name" {...register('last_name', {
          required: { value: true, message: "Last name is missing" },
          minLength: { value: 3, message: "Last name must be minimum 3 chars" },
          maxLength: { value: 50, message: "Last name can't exceed 50 chars" }
        })} />
        <span style={errStyle}>{formState.errors.last_name?.message}</span>
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
        Register <AiOutlineArrowRight />
      </Button>

      <hr style={{ borderColor: 'var(--ps-border)', marginTop: '24px' }} />
      <p style={{ color: 'var(--ps-text-secondary)', textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>
        Already have an account?{' '}
        <NavLink to="/auth/login" style={{ color: 'var(--ps-gold)', textDecoration: 'none' }}>
          Login
        </NavLink>
      </p>
    </Form>
  );
};

export default Register;
