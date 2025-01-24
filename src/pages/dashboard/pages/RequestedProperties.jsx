import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const {data: offers, isLoading, refetch} = useQuery({
        queryKey: ['offers'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/offers')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
    return (
        <div>
            All Offers: {offers.length}
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
        <td>{offer.price}</td>
        <td>
            <button className="btn btn-xs btn-primary">Accept</button>
        </td>
        <td>
        <button className="btn btn-xs btn-secondary">Reject</button>
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