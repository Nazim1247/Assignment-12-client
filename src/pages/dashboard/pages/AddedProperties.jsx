import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddedProperties = () => {
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

    console.log(properties)

    return (
        <div>
            properties: {properties.length}
            
        </div>
    );
};

export default AddedProperties;