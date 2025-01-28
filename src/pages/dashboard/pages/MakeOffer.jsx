import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const MakeOffer = () => {
  const [amount,setAmount] = useState(0);
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {id} = useParams();

    const {data: wishlists = [], isLoading, refetch} = useQuery({
        queryKey: ['wishlists', id],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/wishlists/${id}`)
            return data;
        }
    })

    const {title, image, location, agentName, agentEmail, _id, price}= wishlists || {};

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const onSubmit = async (data)=>{
      const offerData = {
        propertyId: _id,
        title: data.title,
        image: data.image,
        location: data.location,
        amount: parseFloat(data.amount),
        agentName: agentName,
        agentEmail: agentEmail,
        date: data.date,
        bayerName: user?.displayName,
        bayerEmail: user?.email,
        status: 'pending',
      }
      //save offer to database
      await axiosSecure.post('/offers',offerData)
      .then(res => {
        if(res.data.insertedId){
          navigate('/dashboard/boughtProperties')
          Swal.fire({
          position: "top-center",
          icon: "success",
          title: "offer has been added",
          showConfirmButton: false,
          timer: 1500
          });
        }
      })
    }
    
    const handleAmount = value =>{ 
      if(value > price){
        setAmount(price);
        return;
      }
      if(value < 0){
        setAmount(1);
        return;
      }
      setAmount(value)
    }

    return (
        <Zoom>
          <div>
          <Helmet>
            <title>Dream House | Make an offer</title>
          </Helmet>
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">Make an offer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title </span>
          </label>
          <input type="text" {...register("title")} defaultValue={title} placeholder="Property Title" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image </span>
          </label>
          <input type="text" {...register("image")} defaultValue={image} placeholder="Property image" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Location</span>
          </label>
          <input type="text" {...register("location")} defaultValue={location} placeholder="location" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input type="text" {...register("name")} defaultValue={agentName} placeholder="agent name" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Email</span>
          </label>
          <input type="email" {...register("email")} defaultValue={agentEmail} placeholder="agent email" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bayer Name</span>
          </label>
          <input type="text" defaultValue={user?.displayName} placeholder="bayer name" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bayer email</span>
          </label>
          <input type="email" defaultValue={user?.email} placeholder="bayer email" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="text" defaultValue={price} placeholder="price" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Offer Amount</span>
          </label>
          <input value={amount}  type="number" {...register("amount",{onChange:(e)=> handleAmount(e.target.value)})} id="amount" name="amount" placeholder="Offer Amount" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Baying Date</span>
          </label>
          <input type="date" {...register("date")} placeholder="Baying Date" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          {user && <button className="btn btn-primary">Offer</button>}
        </div>
      </form>
    </div>
  </div>
        </Zoom>
    );
};

export default MakeOffer;