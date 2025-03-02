import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";

const MyReviews = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: reviews = [], isLoading, refetch} = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/my-reviews/${user?.email}`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleReview = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/reviews/${id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        refetch()
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <Zoom>
            <div>
            <Helmet>
                <title>Dream House | Dashboard | My Reviews</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">My All Reviews: ({reviews.length})</h2>
            </div>
            <div className="space-y-4">
                {reviews.map(review => 
                    <div key={review._id} className=" space-y-2 rounded-md p-6 shadow dark:bg-gray-800">
                        <h2 className="text-2xl font-bold text-green-600"><span className="font-semibold">Property:</span> {review.property.title}</h2>
                        <h2 className="text-xl font-semibold"><span className="font-semibold">Agent:</span> {review.property.agentName}</h2>
                        <p><span className="font-semibold">Date:</span> {review.date}</p>
                        <p><span className="font-semibold">Description:</span> {review.rev}</p>
                        <button onClick={()=> handleReview(review._id)} className="btn btn-sm btn-secondary">Delete</button>
                    </div>
                )}
            </div>
        </div>
        </Zoom>
    );
};

export default MyReviews;