import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const AdvertiseProperties = () => {
    const [properties,setProperties]=useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
            const fetchAllProperties = async()=>{
               const res = await axiosSecure.get(`/all-properties`)
               setProperties(res.data)
             }
            fetchAllProperties();
        },[]);
        
        const handleAdvertise = async (id)=>{
            // console.log(id)
            const res = await axiosSecure.patch(`/admin/advertise-property/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "add successfully in the home!",
            showConfirmButton: false,
            timer: 1500
            });
            // Update the UI dynamically
            setProperties(properties.filter(property => property._id !== id));
        }
        }

    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Dashboard | Advertise Properties</title>
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
        <th>Property Image</th>
        <th>Property Title</th>
        <th>Agent Name</th>
        <th>Price</th>
        <th>Advertise</th>
      </tr>
    </thead>
    <tbody>
      {
        properties.map((property,index) => 
        <tr key={property._id} className="space-y-4">
        <th>{index +1}</th>
        <img src={property.image} className="w-12 h-12 rounded-full" alt="" />
        <td>{property.title}</td>
        <td>{property.agentName}</td>
        <td><p className="text-green-600 border rounded-3xl px-2">${property.price}</p></td>
        <td>
            <button onClick={()=>handleAdvertise(property._id)} className="btn btn-xs btn-primary">Advertise</button>
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

export default AdvertiseProperties;