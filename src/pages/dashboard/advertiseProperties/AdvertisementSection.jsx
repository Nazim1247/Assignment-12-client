import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const AdvertisementSection = () => {
    const axiosPublic = useAxiosPublic()
    const [advertisedProperties, setAdvertisedProperties] = useState([]);

    useEffect(() => {
        const fetchAdvertisedProperties = async () => {
            const res = await axiosPublic.get('/advertised-properties');
            setAdvertisedProperties(res.data);
        };
        fetchAdvertisedProperties();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center text-green-600 my-6">The Top Advertisements</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {advertisedProperties.map(property => (
                    <div key={property._id} className="border p-4 space-y-2 rounded-lg shadow">
                        <img
                            src={property.image}
                            alt="Property"
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl font-bold mt-2 text-green-600">{property.title}</h2>
                        <p className="flex items-center gap-2 font-semibold"><FaLocationDot className="text-green-600"/>{property.location}</p>
                        <div className="flex items-center justify-between">
                            <p className="flex items-center font-semibold gap-1">{property.status}<MdVerified className="text-blue-600"/></p>
                            <p className="text-green-600 border rounded-3xl px-3">${property.price}</p>
                        </div>
                        <Link to={`/propertyDetails/${property._id}`}><button className="btn btn-sm btn-primary w-full mt-2">Details</button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementSection;
