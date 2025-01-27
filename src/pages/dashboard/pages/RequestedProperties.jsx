import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAgent from "../../../hooks/useAgent";


const RequestedProperties = () => {
  const [isAgent] = useAgent();
  const [status,setStatus]=useState(null);
    const axiosSecure = useAxiosSecure();
    const {data: offers, isLoading, refetch} = useQuery({
        queryKey: ['offers'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/requested-offers/${isAgent?.user?.email}`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleAccept = ()=>{
      setStatus('accepted');
    }

    const handleReject = ()=>{
      setStatus('rejected');
    }
    return (
        <div>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Requested Properties: ({offers.length})</h2>
            </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Property Title</th>
        <th>Location</th>
        <th>Bayer</th>
        <th>Bayer Email</th>
        <th>Price</th>
        <th>Accept</th>
        <th>Reject</th>
      </tr>
    </thead>
    <tbody>
      {
        offers.map((offer,index) => 
        <tr key={offer._id}>
        <th>{index +1}</th>
        <td>{offer.title}</td>
        <td>{offer.location}</td>
        <td>{offer.bayerName}</td>
        <td>{offer.bayerEmail}</td>
        <td>${offer.amount}</td>
        <td>
            <button onClick={handleAccept} disabled={status === 'accepted' || status === 'rejected'} className="btn btn-xs btn-primary">Accept</button>
        </td>
        <td>
        <button onClick={handleReject} disabled={status === 'accepted' || status === 'rejected'} className="btn btn-xs btn-secondary">Reject</button>
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default RequestedProperties;