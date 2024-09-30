import { useState } from "react";
 import { Button, Col, Container, Form } from "react-bootstrap";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import libratImage from '../../images/librat.jpg';
import { useAuth } from "../../app/layout/api/authContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from context

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            await login(username, password); // Use the login function from AuthContext
            navigate("/home");
            window.location.reload(); // Reload to ensure any state changes take effect
        } catch (err) {
            console.log(err);
        }
    };

   return (
     <>
     <div id="login-wrapper" >
       <div className="part overflowHidden">
     <div className="login-box">
     <div id="main-logo">
       <svg
             xmlns="http://www.w3.org/2000/svg"
             width="1cm"
             height="1cm"
             fill="#424f57"
             className="bi bi-book"
             viewBox="0 0 16 18"
           >
             <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
           </svg>
           {/* <h1>Biblioteka</h1> */}
           </div>
       <div className="login-header">
         <header><b>Welcome back</b></header>
         <p>Welcome back, please enter your details.</p>
       </div>
       <form className="login-form" onSubmit={handleSubmit}>
       <div className="input-box">
         <input type="text" className="input-field" id="username" required
   value={username}
   onChange={(e) => setUsername(e.target.value)}></input>
         <label>Username</label>
       </div>
       <div className="input-box">
         <input type="password" className="input-field" id="password" required value={password}
   onChange={(e) => setPassword(e.target.value)}></input>
         <label>Password</label>
       </div>
       <div className="input-box">
         <button className="submitbtn">Sign In</button>
       </div>
       <div className="sign-up">
         <p>Don't have account? <a className="custom-link" href="/register">Sign up</a></p>
       </div>
       </form>
     </div>
     </div>
     <div className="part hideMobile" id="cover">
     <img src={libratImage} alt="Librat" />
     </div>
     </div>
     </>
   );
 };
 export default Login;