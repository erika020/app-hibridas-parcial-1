import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const endPoint = "http://localhost:5000/api/user/auth";
    const emailRef = useRef();
    const passwordRef = useRef();
    const [msg, setMsg] = useState(null);

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        const option = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        };

        try {
            const response = await fetch(endPoint, option);
            const json = await response.json();

            if (!response.ok) {
                setMsg(json.msg);
                return;
            }

            login(json.token);

            const payload = JSON.parse(atob(json.token.split(".")[1]));
            const userRole = payload.rol;

            if (userRole === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error(error);
            setMsg("Error de conexión");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login">
            <h1>Login</h1>

            <label>Email</label>
            <input ref={emailRef} type="email" />

            <label>Password</label>
            <input ref={passwordRef} type="password" />

            <button type="submit"> Login </button>

            <div className="ingresarA">
                <hr />
                <h4>{msg}</h4>
                <NavLink to="/register">Not registered? Create an account </NavLink>
            </div>
        </form>
    );
};

export default Login;
