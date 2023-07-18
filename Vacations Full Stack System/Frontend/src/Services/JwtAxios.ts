import axios from "axios";
import store from "../Redux/Store";
import { authStore } from "../Redux/AuthState";
const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
    // If user logged in:
    if (authStore.getState().token) {
        // Add the token to request headers:
        request.headers["Authorization"] =
            "Bearer " + authStore.getState().token;
    }

    return request;
});

export default jwtAxios;
