import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import ReviewModal from "../components/ReviewModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import ReviewSection from "./ReviewSection";
import useAdmin from "../hooks/useAdmin";


const PropertyDetails = () => {
    const [isAdmin] = useAdmin();
    const {user} = useContext(AuthContext);
    // const [users,setUsers] = useState([]);
    // const [property,setProperty] = useState([]);
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
    useEffect(()=>{
        // fetchProperty();
        // fetchUser();
    },[])
    // const fetchProperty =  async()=>{
    //     await axiosSecure.get(`/properties/${id}`)
    //     .then(res =>{
    //         setProperty(res.data)
    //     })
    // }

    // const fetchUser = async()=>{
    //     await axiosSecure.get(`/users`)
    //     .then(res =>{
    //         setUsers(res.data)
    //     })
    // }
    // console.log(users)
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
            axiosSecure.post('/wishlists',cartItem)
            .then(res =>{
                if(res.data.insertedId){
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
      <p className="">Description: {description}</p>
      <div className="flex items-center justify-between">
      <img className="w-12 h-12 rounded-full" src={agentImage} alt="" />
      <p className="">{agentName}</p>
      </div>
       {isAdmin.user.role !== 'admin' && isAdmin.user.role !== 'agent'?<button onClick={handleAddToWishlist} className="btn btn-sm btn-primary mr-2">Add to Wishlist</button>: <button disabled onClick={handleAddToWishlist} className="btn btn-sm btn-primary mr-2">Add to Wishlist</button>}
      <button onClick={() => setIsOpen(true)} className="btn btn-sm btn-primary">Add a Review</button>
    </div>
  </div>
</div>

<div>
    <ReviewSection propertyId={_id}></ReviewSection>
</div>

<ReviewModal closeModal={closeModal} isOpen={isOpen} property={property}></ReviewModal>
        </div>
    );
};

export default PropertyDetails;