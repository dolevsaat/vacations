import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!")
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="text" pattern="^[\w.]+@[\w.]+\.[\w.]+$"
                    autoComplete="true" required {...register("email")} />

                <label>Password:</label>
                <input type="password" minLength={4} required {...register("password")} />

                <button>Login</button>

                <p>Don't have an account?</p>

                <NavLink to={"/register"}> Register Here</NavLink>

            </form>

        </div>
    );
}

export default Login;
