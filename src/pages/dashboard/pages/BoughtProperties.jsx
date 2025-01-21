import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";


const BoughtProperties = () => {
    const [offers, setOffers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        const fetchAllOffers = async ()=>{
            const {data} = await axiosSecure.get('/offers')
            return setOffers(data);
        }
        fetchAllOffers();
    },[])

    return (
        <div>
            boughtProperties: {offers.length}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    offers.map(offer => 
             <div key={offer._id} className="card shadow h-full flex flex-col justify-between">
              <figure className="p-4">
                <img
                  src={offer.image}
                  alt=""
                  className="rounded-xl" />
              </figure>
              <div className="p-4 space-y-2">
                <h2 className="card-title">{offer.title}</h2>
                <div className="flex items-center justify-between">
                <p className="flex items-center"><IoLocationSharp />{offer.location}</p>
                <p>${offer.amount}</p>
                </div>
                <h3 className="text-md font-semibold">Agent:  {offer.agentName}</h3>
                <p>Status: {offer.status}...</p>
              </div>
            </div>
                )
                }
            </div>
        </div>
    );
};

export default BoughtProperties;