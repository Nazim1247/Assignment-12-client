import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {data: cart=[]} = useQuery({
        queryKey: ['cart'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('carts')
        }
    })
    return cart;
};

export default useCart;