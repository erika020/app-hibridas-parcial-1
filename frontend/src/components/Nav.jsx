import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Nav = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            
            <div className="nav-logo">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/Call_of_Duty_-_Black_Ops_6_Logo.svg"
                    alt="COD Logo"
                />
            </div>

            <ul className="nav-menu">
                <li><NavLink to="/" end>Home</NavLink></li>
                
                {user?.rol === "admin" && (
                    <li><NavLink to="/admin">Admin Panel</NavLink></li>
                )}
                {!user && <li><NavLink to="/login">Login</NavLink></li>}
                {!user && <li><NavLink to="/register">Register</NavLink></li>}
            </ul>

            <div className="nav-user">
                {user && (
                    <>
                        <span className="username">{user.name}</span>
                        <button onClick={logout} className="logout-btn">Log Out</button>
                    </>
                )}
            </div>

        </nav>
    );
}

export default Nav;