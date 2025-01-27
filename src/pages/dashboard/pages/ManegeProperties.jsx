import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManegeProperties = () => {
    const axiosSecure = useAxiosSecure();
    const {data: properties, isLoading, refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/properties')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    return (
        <div>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Properties: ({properties.length})</h2>
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
        <th>Agent</th>
        <th>Agent Email</th>
        <th>Price</th>
        <th>Verify</th>
        <th>Reject</th>
      </tr>
    </thead>
    <tbody>
      {
        properties.map((property,index) => 
        <tr key={property._id}>
        <th>{index +1}</th>
        <td>{property.title}</td>
        <td>{property.location}</td>
        <td>{property.agentName}</td>
        <td>{property.agentEmail}</td>
        <td>{property.price}</td>
        <td>
            <button className="btn btn-xs btn-primary">Verify</button>
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

export default ManegeProperties;