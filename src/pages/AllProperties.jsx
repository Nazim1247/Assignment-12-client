import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";


const AllProperties = () => {
    const axiosPublic = useAxiosPublic();
    const {data: properties, isLoading} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=>{
            const {data} = await axiosPublic.get('/properties')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
    return (
        <div className="w-11/12 mx-auto">
            all properties: {properties.length}
            <div>
            {
                properties && properties.length > 0 ? <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        properties.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                    }
                </div> 
                : 
                <p>No Data Available</p>
            }
            </div>
        </div>
    );
};

export default AllProperties;