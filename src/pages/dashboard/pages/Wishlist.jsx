import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WishlistCart from "./WishlistCart";

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
            <h2>All Wishlist: {wishlists.length}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlists.map(wishlist => <WishlistCart key={wishlist._id} wishlist={wishlist}></WishlistCart>)}
            </div>
        </div>
    );
};

export default Wishlist;