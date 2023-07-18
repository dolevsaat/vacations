import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First name:</label>
                <input type="text" minLength={2} maxLength={30} required {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" minLength={2} maxLength={50} required {...register("lastName")} />

                <label>Email:</label>
                <input type="text" pattern="^[\w.]+@[\w.]+\.[\w.]+$" placeholder="example@gmail.com" required {...register("email")} />

                <label>Password:</label>
                <input type="password" minLength={4} required {...register("password")} />

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
