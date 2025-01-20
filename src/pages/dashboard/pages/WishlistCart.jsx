import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


const WishlistCart = ({wishlist}) => {
    const {title, image, price, location, agentName, agentImage, _id}= wishlist || {};
    
    return (
        <div>
            <div className="card shadow h-full flex flex-col justify-between">
              <figure className="p-4">
                <img
                  src={image}
                  alt=""
                  className="rounded-xl" />
              </figure>
              <div className="p-4 space-y-2">
                <h2 className="card-title">{title}</h2>
                <div className="flex items-center justify-between">
                <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
                <h3 className="text-md font-semibold">{agentName}</h3>
                </div>
                <div className="flex items-center justify-between">
                <p className="flex items-center"><IoLocationSharp />{location}</p>
                <p>${price}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Link to={`/dashboard/makeOffer/${_id}`}><button className="btn btn-sm btn-primary">Make an offer</button></Link>
                  <button className="btn btn-sm btn-primary">Remove</button>
                </div>
              </div>
            </div>
        </div>
    );
};

export default WishlistCart;