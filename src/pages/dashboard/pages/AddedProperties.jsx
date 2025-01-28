import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";
// import useAgent from "../../../hooks/useAgent";


const AddedProperties = () => {
  // const [isAgent] = useAgent();
  
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const [properties, setProperties] = useState([]);

    // useEffect(() => {
    //     const fetchMyProperties = async () => {
    //         try {
    //             const res = await axiosSecure.get(`/property/${user?.email}`)
    //             setProperties(res.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     if(user){
    //         fetchMyProperties();
    //     }
    // }, [user])

    const {data: properties = [], isLoading, refetch} = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/property/${user?.email}`)
            return data;
        }
    })

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleDelete = (property)=>{
        // console.log(property)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/propertyDelete/${property._id}`)
                
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        refetch()
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Dashboard | My Added Properties</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Added Properties: ({properties.length})</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                properties.map(property => 
                    <div key={property._id} className="card shadow h-full flex flex-col justify-between">
                    <figure className="p-4">
                      <img
                        src={property.image}
                        alt=""
                        className="rounded-xl w-full md:h-40" />
                    </figure>
                    <div className="p-4 space-y-2">
                      <h2 className="card-title text-green-600">{property.title}</h2>
                      <div className="flex items-center justify-between">
                      <img className="w-12 h-12 rounded-full" src={property.agentImage} alt="" />
                      <h3 className="text-md font-semibold flex items-center"><FaUser /> {property.agentName}</h3>
                      </div>
                      <p className="flex items-center"><IoLocationSharp className="text-green-600"/>{property.location}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-green-600">{property.status}</p>
                      <p className="text-green-600 border rounded-3xl px-3">${property.price}</p>
                      </div>
                      <div className="flex gap-2 items-center justify-between">
                        <Link to={`/dashboard/updateProperty/${property._id}`}><button className="btn btn-sm btn-primary">Update</button></Link>
                        <button onClick={()=>handleDelete(property)} className="btn btn-sm btn-secondary">Delete</button>
                      </div>
                    </div>
                  </div>        
                )
            }
            </div>
        </div>
        </Zoom>
    );
};

export default AddedProperties;