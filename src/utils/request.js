import axios from "axios";
import { netConfig } from "../config/net.config";
const { cors, baseURL, contentType, messageDuration, requestTimeout, successCode } = netConfig;

const handleUnauthorizedError = async (error) => {
    const tokenStore = useTokenStore();
    const originalRequest = error.config;
    const authStore = useAuthStore(); 
}
const request = axios.create({
    baseURL: baseURL,
    timeout: requestTimeout,
    withCredentials: true,
    headers: {
        "Content-Type": contentType,
        Accept: "application/json",
    },
})
request.interceptors.request.use(
    (config)=>{
        const tokenStore = useTokenStore();
        const accessToken = tokenStore?.token || JSON.parse(localStorage.getItem("access-token"))?.accessToken || null;
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
(error)=>{
        return Promise.reject(error);
    
})
request.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        let message = "Unknown error";
        const { response } = error;
        if (response){
            const { status, data } = response;

            switch(status){
                case 400:
                    message = data.message || "Bad request";
                    break;
                case 401:
                    return await handleUnauthorizedError(error);
                case 403:
                    message = data.message || "Forbidden";
                    break;
                case 404:
                    message = data.message || "Not found";
                    break;
                case 500:
                    message = "Internal Server Error";
                    break;
                default:
                    message = response.data.message || `Unknown error {${status}`;
            }
        }
    }
)
export default request;