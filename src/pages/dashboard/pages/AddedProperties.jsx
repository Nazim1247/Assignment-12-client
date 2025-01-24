import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
        console.log(property)
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
        <div>
            properties: {properties.length}
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
                      <h2 className="card-title">{property.title}</h2>
                      <div className="flex items-center justify-between">
                      <img className="w-12 h-12 rounded-full" src={property.agentImage} alt="" />
                      <h3 className="text-md font-semibold">{property.agentName}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                      <p className="flex items-center"><IoLocationSharp />{property.location}</p>
                      <p>${property.price}</p>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Link to={`/dashboard/updateProperty/${property._id}`}><button className="btn btn-sm btn-primary w-full">Update</button></Link>
                        <button onClick={()=>handleDelete(property)} className="btn btn-sm btn-primary">Delete</button>
                      </div>
                    </div>
                  </div>        
                )
            }
            </div>
        </div>
    );
};

export default AddedProperties;