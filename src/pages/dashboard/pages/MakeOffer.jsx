import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";


const MakeOffer = () => {
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

    return (
        <div>
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">Make an offer</h1>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title </span>
          </label>
          <input type="text" defaultValue={title} placeholder="Property Title" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Location</span>
          </label>
          <input type="text" defaultValue={location} placeholder="location" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input type="text" defaultValue={agentName} placeholder="agent name" className="input input-bordered" readOnly />
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
          <input type="number" placeholder="Offer Amount" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Baying Date</span>
          </label>
          <input type="date" placeholder="Baying Date" className="input input-bordered" required />
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