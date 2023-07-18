import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import RoleModel from "../Models/RoleModel";
import jwtDecode from "jwt-decode";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        // Send user to backend to register:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract token:
        const token = response.data;

        // Save token in global state:
        authStore.dispatch({ type: AuthActionType.UserRegistered, payload: token });
    }

    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend to login:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract token:
        const token = response.data;

        // Save token in global state: 
        authStore.dispatch({ type: AuthActionType.UserLoggedIn, payload: token });
    }

    public logout(): void {

        // Logout in global state: 
        authStore.dispatch({ type: AuthActionType.UserLoggedOut });

    }

    // ====================== Verify LoggedIn ======================
    public verifyLoggedIn(): boolean {
        // Get token from global state
        const token = authStore.getState().token;
        if (!token) return false;

        // check if there is a user inside token
        const user = jwtDecode<{ user: UserModel }>(token).user;
        if (!user) return false;

        return true;
    }
    // ====================== Verify Admin ======================
    public isAdmin(): boolean {
        // Get token from global state
        const token = authStore.getState().token;
        if (!token) return false;

        // check if there is a user inside token
        const user = jwtDecode<{ user: UserModel }>(token).user;

        // If user is not admin:
        if (user.roleId !== RoleModel.Admin) {
            return false;
        }
        return true;
    }
}

const authService = new AuthService();

export default authService;
