
import { FaHome, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


const PropertyCard = ({property}) => {
    const {title, image, price, location, agentName, agentImage, status, _id} = property || {};
    return (
        <div>
            <div className="card shadow h-full flex flex-col justify-between">
  <figure className="p-4">
    <img
      src={image}
      alt=""
      className="rounded-xl w-full md:h-40" />
  </figure>
  <div className="p-4 space-y-2">
    <h2 className="card-title text-green-600"><FaHome />{title}</h2>
    <div className="flex items-center justify-between">
    <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
    <p>{status}</p>
    <h3 className="text-md font-semibold flex items-center gap-1"><FaUser />{agentName}</h3>
    </div>
    <div className="flex items-center justify-between">
    <p className="flex items-center"><IoLocationSharp className="text-green-600"/>{location}</p>
    <p className="text-green-600 border rounded-3xl px-1">${price}</p>
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