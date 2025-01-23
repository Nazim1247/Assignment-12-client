import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManegeReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {data: reviews = [], isLoading, refetch} = useQuery({
        queryKey: ['reviews'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/allReviews`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleDelete = (id)=>{
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
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
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
            manegeReviews: {reviews.length}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                reviews.map(review => 
            <div key={review._id} className="text-center space-y-2 border rounded-md p-4">
            <img className="w-32 h-32 rounded-full mx-auto" src={review.photo} alt="" />
            <h2 className="font-semibold text-xl">{review.name}</h2>
            <p className="font-semibold text-green-600">{review.email}</p>
            <p>Review: {review.rev}</p>
            <button onClick={()=> handleDelete(review._id)} className="btn btn-sm btn-secondary">Delete</button>
            </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManegeReviews;