import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const ManegeProperties = () => {
  const [disabled, setDisabled] = useState(null);
    const axiosSecure = useAxiosSecure();
    const {data: properties, isLoading, refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/properties')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleVerify = async (id)=>{
       await axiosSecure.patch(`/properties/verify/${id}`)
        .then(res =>{
            // console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Is an admin now!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleReject = async (id)=>{
      await axiosSecure.patch(`/properties/reject/${id}`)
      .then(res =>{
          // console.log(res.data)
          if(res.data.modifiedCount > 0){
              refetch();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Is an admin now!",
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      })
    }

    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Dashboard | Manege Properties</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Properties: ({properties.length})</h2>
            </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="text-gray-900 dark:text-gray-100">
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
        <td><p className="text-green-600 border rounded-3xl px-2">${property.price}</p></td>
        <td>
            {property.status === 'verified'? <p className="text-green-600 border rounded-3xl px-2">Verified</p>:
            <button onClick={()=>handleVerify(property._id)} className="btn btn-xs btn-primary" disabled={property.status === 'rejected'}>Verify</button>}
        </td>
        <td>
        {property.status === 'rejected'?<p className="text-pink-600 border rounded-3xl px-2">Rejected</p>:
        <button onClick={()=>handleReject(property._id)} className="btn btn-xs btn-secondary" disabled={property.status === 'verified'}>Reject</button>}
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
            </div>
        </div>
        </Zoom>
    );
};

export default ManegeProperties;