import axios from "axios";
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
    async (config) =>{
        config.headers = {
            "x-token": localStorage.getItem("token"),
            "x-refresh-token" : localStorage.getItem("refreshToken"),
        };
        return config;
    },
    (error)=>{
        Promise.reject(error);
    }
);

axiosApiInstance.interceptors.response.use(
    async (response) => {
        let token = response.headers["x-token"];
        let refreshToken = response.headers["x-refresh-token"];
        if(token){
            localStorage.setItem("token",token);
        }
        if(refreshToken){
            localStorage.setItem("refreshToken",refreshToken);
        }
        return Promise.resolve(response);
    },
    async (error)=>{
        if(error.response.status === 401 || error.response.status ===403){
            localStorage.clear();
            window.location.reload();
            console.log(error)
        }

        console.log(error);
        return Promise.reject(error);
    }
);
export default axiosApiInstance;