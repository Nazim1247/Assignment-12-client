import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import ReviewModal from "../components/ReviewModal";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import ReviewSection from "./ReviewSection";
import useAdmin from "../hooks/useAdmin";
import { FaUser } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Helmet } from "react-helmet";

const PropertyDetails = () => {
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const {user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const {data: property = [], isLoading, refetch} = useQuery({
        queryKey: ['property', id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/properties/${id}`)
            return data;
        }
    })
    
    const {title, image, price, location, agentName, agentImage, agentEmail, status, description, _id}= property || {};

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const closeModal = ()=>{
        setIsOpen(false)
    }

    const handleAddToWishlist = ()=>{
        if(user){
            const cartItem = {
                propertyId: _id,
                email: user.email,
                title, image, price, location, agentName, agentImage, agentEmail, description,
            }
            axiosSecure.post('/wishlists',cartItem)
            .then(res =>{
                if(res.data.insertedId){
                    navigate('/dashboard/wishlist')
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Cart has been added to Wishlist",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
        }else{
            alert('only user can add')
        }
    }

    return (
        <div className="w-11/12 mx-auto">
            <Helmet>
                <title>Dream House | Property Details</title>
            </Helmet>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row lg:gap-16">
    <img
      src={image}
      className="w-full rounded-lg" />
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-bold text-green-600">{title}</h1>
      <div className="flex items-center justify-between">
      <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
      <p className="flex items-center gap-2 font-semibold"><FaUser />Agent: {agentName}</p>
      </div>
      <p><span className="font-semibold">Agent Email:</span> {agentEmail}</p>
      <p className="flex items-center gap-1"><IoLocationSharp className="text-green-600"/>{location}</p>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 font-semibold">Status: <span className="text-green-600">{status}</span><MdVerified className="text-blue-600"/></p>
      <p className="text-green-600 border rounded-3xl px-3">${price}</p>
      </div>
      <p className=""><span className="font-semibold">Description:</span> {description}</p>
       <div className="flex items-center justify-between">
       {
       isAdmin?.user?.role !== 'admin' && isAdmin?.user?.role !== 'agent'?
       <button onClick={handleAddToWishlist} className="btn btn-sm btn-primary mr-2">Add to Wishlist</button>
       : 
       <button disabled className="btn btn-sm btn-primary mr-2">Add to Wishlist</button>
       }
      {isAdmin?.user?.role !== 'admin' && isAdmin?.user?.role !== 'agent'?
      <button onClick={() => setIsOpen(true)} className="btn btn-sm btn-primary">Add a Review</button>
      : 
      <button disabled className="btn btn-sm btn-primary mr-2">Add a Review</button>}
       </div>
    </div>
  </div>
</div>
<div className="divider"></div>
<div>
    <ReviewSection propertyId={_id}></ReviewSection>
</div>

<ReviewModal closeModal={closeModal} isOpen={isOpen} property={property}></ReviewModal>
        </div>
    );
};

export default PropertyDetails;