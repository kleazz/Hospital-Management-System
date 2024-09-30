import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';

interface CreateCheckoutSessionResponse {
  sessionId: string;  
}

const Register = () => {
  const [input, setInput] = useState({ username: '', email: '', password: '' });
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStripeKey = async () => {
      const stripe = await loadStripe('pk_test_51PyeeALUKecp13O9OHp8dBKpXU05C8tW4dK7EtuxbPAf2qkpXb7rQR1v9dmqLOkFqNBjGGY7EWORg3vt3Ejuosl200l3Td7Gkx');
      setStripePromise(stripe);
    };
    loadStripeKey();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:7226/api/Authenticate/register/",
        input
      );

      // Handle success
      console.log("Registration successful!");

      // Navigate to the home page ("/") after successful registration
      navigate("/");

    } catch (err) {
      // Handle errors, e.g., show an error message
      console.error(err);
    }
  };

  return (
    <div id="signup-wrapper">
      <div className="login-box">
        <div id="main-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="1cm" height="1cm" fill="#424f57" className="bi bi-book" viewBox="0 0 16 18">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
        </div>
        <div className="login-header">
          <header><b>Join us today</b></header>
          <p>Enter your details to register.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" className="input-field" name="username" required onChange={handleChange} />
            <label>Username</label>
          </div>
          <div className="input-box">
            <input type="email" className="input-field" name="email" required onChange={handleChange} />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" className="input-field" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>
          <div className="input-box">
            <button className="submitbtn">Join Us</button>
          </div>
          <div className="sign-up">
            <p>Already have an account? <a className="custom-link" href="/">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
