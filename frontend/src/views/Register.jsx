import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
const Register = () =>{
    const navigate = useNavigate();

    const [ user, setUser] = useState({
        name: '', 
        email: '', 
        password1: '',
        password2: '',
    });
    const onChange = ( event ) => {
        const { name, value} = event.target;
        setUser( {...user, [ name ] : value } );
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const endPoint = 'http://127.0.0.1:5000/api/user';
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: user.name, 
                email: user.email,
                password: user.password1
            })
        }

        const response = await fetch(endPoint, option);
        const data = await response.json();
        console.log(data);
        navigate('/login');
    }
    return (
        <>
        
            <form onSubmit={ onSubmit } className="login">
                <h1>Register</h1>
                <label htmlFor="email">Email</label>
                <input value={user.email} onChange={ onChange } type="email" name="email" />

                <label htmlFor="nombre">Name</label>
                <input value={user.name} onChange={ onChange } type="text" name="name"/>

                <label htmlFor="password1">Password</label>
                <input value={user.password1} onChange={ onChange } type="password" name="password1"/>

                <label htmlFor="password2">Confirm Password</label>
                <input value={user.password2} onChange={ onChange } type="password" name="password2"/>

                <button type="submit">Register</button>

                <div className="ingresarA">
                    <NavLink to='/login'>Are you already registered? Log in</NavLink>
                </div>
            </form>
        </>
    )
}

export default Register