
import { Helmet } from "react-helmet";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";

const AllProperties = () => {
    const [sort, setSort]=useState('');
    const [search, setSearch] = useState('');
    const [properties,setProperties] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        const fetchAllProperties = async()=>{
           const res = await axiosPublic.get(`/all-properties?search=${search}&sort=${sort}`)
           setProperties(res.data)
         }
        fetchAllProperties();
    },[search,sort]);

    const handleSort = async()=>{
    setSort('decs')
     }

     const handleSearch = (e)=>{
        setSearch(e.target.value);
     }

    return (
        <Zoom>
            <div className="w-11/12 mx-auto">
            <Helmet>
                <title>Dream House | All Properties</title>
            </Helmet>
            <div className="md:flex items-center justify-between bg-primary mb-4 p-2 rounded-t-lg text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">All Properties: {properties.length}</h2>
                <button onClick={handleSort} className="btn">Sort By Price</button>
                <label className="input input-bordered flex items-center gap-2">
              <input onChange={handleSearch} value={search} name="search" type="text" className="grow" placeholder="Search By Location" />
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
              </svg>
            </label>
            </div>
            <div>
            {
                properties && properties.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        properties.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                    }
                </div> 
                : 
                <p className="text-center text-green-600 text-2xl mt-8">No Data Available</p>
            }
            </div>
        </div>
        </Zoom>
    );
};

export default AllProperties;