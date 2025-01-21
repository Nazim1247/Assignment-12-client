import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const MakeOffer = () => {
  const { register, handleSubmit } = useForm();
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

    const {title, image, price, location, agentName, agentImage, description, _id}= wishlists || {};

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const onSubmit = async (data)=>{
      const offerData = {
        title: data.title,
        image: data.image,
        location: data.location,
        amount: parseFloat(data.amount),
        agentName: agentName,
        date: data.date,
        bayerName: user?.displayName,
        bayerEmail: user?.email,
        status: 'pending',
      }
      //save offer to database
      await axiosSecure.post('/offers',offerData)
      .then(res => {
        
        if(res.data.insertedId){
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
    return (
        <div>
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
            <span className="label-text">Offer Amount</span>
          </label>
          <input type="number" {...register("amount")} placeholder="Offer Amount" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Baying Date</span>
          </label>
          <input type="date" {...register("date")} placeholder="Baying Date" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Offer</button>
        </div>
      </form>
    </div>
  </div>
    );
};

export default MakeOffer;