import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const MyReviews = () => {
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        const fetchAllReviews = async ()=>{
            const {data} = await axiosSecure.get(`/reviews/${user?.email}`)
            return setReviews(data);
        }
        fetchAllReviews();
    },[])

    return (
        <div>
            myReviews: {reviews.length}
            <div className="space-y-4">
                {reviews.map(review => 
                    <div key={review._id} className=" space-y-2 border rounded-md p-6">
                        <h2>Property: {review.property.title}</h2>
                        <h2>Agent: {review.property.agentName}</h2>
                        <p>Date: {review.date}</p>
                        <p>Description: {review.rev}</p>
                        <button className="btn btn-sm btn-primary">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;