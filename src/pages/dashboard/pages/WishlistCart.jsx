import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const WishlistCart = ({wishlist,refetch}) => {
  const axiosSecure = useAxiosSecure();
    const {title, image, price, location, agentName, agentImage, _id}= wishlist || {};

    const handleRemove = (id)=>{
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
                      await axiosSecure.delete(`/wishlists/${id}`)
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
            <div className="card shadow h-full flex flex-col justify-between">
              <figure className="p-4">
                <img
                  src={image}
                  alt=""
                  className="w-full h-40 rounded-xl" />
              </figure>
              <div className="p-4 space-y-2">
                <h2 className="card-title text-green-600 text-2xl">{title}</h2>
                <div className="flex items-center justify-between">
                <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
                <h3 className="text-md font-semibold flex items-center gap-1"><FaUser /><span>Agent:</span> {agentName}</h3>
                </div>
                <div className="flex items-center justify-between">
                <p className="flex items-center gap-2"><IoLocationSharp className="text-green-600"/>{location}</p>
                <p className="text-green-600 border rounded-3xl px-3">${price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Link to={`/dashboard/makeOffer/${_id}`}><button className="btn btn-sm btn-primary w-full">Make an offer</button></Link>
                  <button onClick={()=>handleRemove(_id)} className="btn btn-sm btn-secondary">Remove</button>
                </div>
              </div>
            </div>
        </div>
    );
};

export default WishlistCart;