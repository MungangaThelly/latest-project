import "./Login.css"; 
import { login } from "../services/login.js";

const Login = () => {
    const onSubmit = async (e) => {
        e.preventDefault(); 

        
        const username = e.target.username.value;
        const password = e.target.password.value;

        const result = await login(username, password);

        if(result.status == 200) {
            const jwt = await result.text(); 
            localStorage.setItem("jwt", jwt); 
        } else {
            const error = await result.text();
            console.error(error);
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    autoComplete="username" 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    autoComplete="current-password" 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login; 
