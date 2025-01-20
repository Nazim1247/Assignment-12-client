import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import ReviewModal from "../components/ReviewModal";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import ReviewSection from "./ReviewSection";


const PropertyDetails = () => {
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
    const {title, image, price, location, agentName, agentImage, description, _id}= property || {};
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const closeModal = ()=>{
        setIsOpen(false)
    }

    const handleAddToWishlist = ()=>{
        if(user){
            const cartItem = {
                propertyId: _id,
                email: user.email,
                title, image, price, location, agentName, agentImage, description,
            }
            axiosSecure.post('/carts',cartItem)
            .then(res =>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Cart has been added to Wishlist",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
        }
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={image}
      className="w-full rounded-lg" />
    <div className="space-y-4 w-full">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center justify-between">
      <p className="flex items-center"><IoLocationSharp />{location}</p>
      <p className="">${price}</p>
      </div>
      <p className="">{description}</p>
      <div className="flex items-center justify-between">
      <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
      <p className="">{agentName}</p>
      </div>
      <button onClick={handleAddToWishlist} className="btn btn-sm btn-primary mr-2">Add to Wishlist</button>
      <button onClick={() => setIsOpen(true)} className="btn btn-sm btn-primary">Add a Review</button>
    </div>
  </div>
</div>

<div>
    <ReviewSection></ReviewSection>
</div>

<ReviewModal closeModal={closeModal} isOpen={isOpen} property={property}></ReviewModal>
        </div>
    );
};

export default PropertyDetails;