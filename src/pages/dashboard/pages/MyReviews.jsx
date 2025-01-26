import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const [reviews, setReviews] = useState([]);

    // useEffect(()=>{
    //     const fetchAllReviews = async ()=>{
    //         const {data} = await axiosSecure.get(`/reviews/${user?.email}`)
    //         return setReviews(data);
    //     }
    //     fetchAllReviews();
    // },[])

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
        <div>
            myReviews: {reviews.length}
            <div className="space-y-4">
                {reviews.map(review => 
                    <div key={review._id} className=" space-y-2 border rounded-md p-6">
                        <h2 className="text-2xl font-bold text-green-600">Property: {review.property.title}</h2>
                        <h2 className="text-xl font-semibold">Agent: {review.property.agentName}</h2>
                        <p>Date: {review.date}</p>
                        <p>Description: {review.rev}</p>
                        <button onClick={()=> handleReview(review._id)} className="btn btn-sm btn-primary">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;