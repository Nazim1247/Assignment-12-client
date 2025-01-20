import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const {data: wishlists = [], isLoading, refetch} = useQuery({
        queryKey: ['wishlists'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/wishlists')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    return (
        <div>
            wishlist: {wishlists.length}
        </div>
    );
};

export default Wishlist;