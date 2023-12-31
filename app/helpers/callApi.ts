import axios from "axios";
import ValidationError from "../exceptions/validationError";


const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'http://localhost:5000/api'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true; //زمانی که ریکویست رو به سمت ای پی آی میفرسته، تمام کوکی ها رو هم همراهش میفرسته  
            return config;
        },
        err => { throw err } 
    )

    axiosInstance.interceptors.response.use(
        res => {
            // manage validation
            return res;
        },
        err => {
            const res = err?.response;
            if(res) {
                if(res.status === 422) {
                    console.log(res.data);
                    throw new ValidationError(res.data.errors)
                }
            }
            throw err;
        }
    )

    return axiosInstance;
}


export default callApi;