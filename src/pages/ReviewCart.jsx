import { FaHome, FaUser } from "react-icons/fa";


const ReviewCart = ({review}) => {
    
    return (
        <div className="text-center space-y-2 border rounded-md shadow p-4">
            <img className="w-32 h-32 rounded-full mx-auto" src={review.property.agentImage} alt="" />
            <h2 className="font-semibold text-xl flex items-center justify-center gap-2"><FaUser />{review.property.agentName}</h2>
            <p className="font-semibold text-lg text-green-600 flex items-center justify-center gap-2"><FaHome />{review.property.title}</p>
            <p>{review.rev}</p>
        </div>
    );
};

export default ReviewCart;