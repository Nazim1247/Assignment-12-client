import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WishlistCart from "./WishlistCart";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const Wishlist = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: wishlists = [], isLoading, refetch} = useQuery({
        queryKey: ['wishlists'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/wishlist/${user?.email}`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    return (
        <div>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Wished: ({wishlists.length})</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlists.map(wishlist => <WishlistCart key={wishlist._id} wishlist={wishlist} refetch={refetch}></WishlistCart>)}
            </div>
        </div>
    );
};

export default Wishlist;