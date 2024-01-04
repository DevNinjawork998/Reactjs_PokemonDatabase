import { Axios } from "axios";

const axiosClient = Axios.create({
    baseURL: "http://localhost:3000/pokemon.json",
    headers: {
        "Content-type": "application/json",
    }
});

axiosClient.interceptors.request.use(res => res.data)
export default axiosClient;