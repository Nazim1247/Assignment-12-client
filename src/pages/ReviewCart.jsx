

const ReviewCart = ({review}) => {
    
    return (
        <div className="text-center space-y-2 border rounded-md p-4">
            <img className="w-32 h-32 rounded-full mx-auto" src={review.property.agentImage} alt="" />
            <h2 className="font-semibold text-xl">{review.property.agentName}</h2>
            <p className="font-semibold text-green-600">{review.property.title}</p>
            <p>{review.rev}</p>
        </div>
    );
};

export default ReviewCart;