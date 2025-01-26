
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewCart from "./ReviewCart";


const ReviewSection = ({propertyId}) => {
    // console.log(propertyId)

    const axiosSecure = useAxiosSecure();
    const {data: reviews = [], isLoading, refetch} = useQuery({
        queryKey: ['reviews', propertyId],
        queryFn: async ()=>{
            const {data} = await axiosSecure.get(`/reviews/${propertyId}`)
            return data;
        }
    })

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    return (
        <div className="">
            <h2 className="text-center text-2xl font-bold my-8">User's Reviews</h2> 
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
            reviews.map(review => <ReviewCart key={review._id} review={review}></ReviewCart>)
            }
            </div>
        </div>
    );
};

export default ReviewSection;