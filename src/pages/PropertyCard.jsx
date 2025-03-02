

import { IoLocationSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";


const PropertyCard = ({property}) => {
    const {title, image, price, location, status, _id} = property || {};
    return (
        <div>
            <div className="card shadow h-full flex flex-col justify-between dark:bg-gray-800">
  <figure className="p-4">
    <img
      src={image}
      alt=""
      className="rounded-xl w-full md:h-40" />
  </figure>
  <div className="p-4 space-y-2">
    <h2 className="card-title text-green-600">{title}</h2>
    
    <p className="flex items-center gap-2"><IoLocationSharp className="text-green-600"/>{location}</p>
    <div className="flex items-center justify-between">
      <p className="flex items-center gap-2 font-semibold">{status}<MdVerified className="text-blue-600"/></p>
    <p className="text-green-600 shadow dark:bg-gray-700 rounded-3xl px-3">${price}</p>
    </div>
    <div className="">
      <Link to={`/propertyDetails/${_id}`}><button className="btn btn-sm btn-primary w-full">Details</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default PropertyCard;