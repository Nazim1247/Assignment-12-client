import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-2f479.web.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;