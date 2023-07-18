import "./AuthMenu.css"
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Models
import UserModel from "../../../Models/UserModel";
// Services
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {
    const navigate = useNavigate();

    // User state
    const [user, setUser] = useState<UserModel>();

    // Get user From redux
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => unsubscribe();
    }, []);

    // Log out
    function logout(): void {
        authService.logout();
        notifyService.success("Goodbye, have a great day!");
        navigate("/login");
    }

    // ============================= HTML =============================
    return (
        <div className="AuthMenu">

            {!user &&
                <>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }

            {user &&
                <>
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to="/login" onClick={logout}>Logout</NavLink>
                </>
            }

        </div>
    );
}

export default AuthMenu;

