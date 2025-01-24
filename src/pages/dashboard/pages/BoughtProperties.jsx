import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


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
        <div className="border rounded-md">
            <div className="flex items-center justify-between bg-primary mb-4 p-2 rounded-t-md">
                <h2 className="text-xl font-bold text-white">All Bought Properties: ({offers.length})</h2>
                {offers.length ? <Link to='/dashboard/payment'><button className="btn btn-sm btn-secondary">Pay</button></Link>
                :
                <button disabled className="btn btn-sm btn-secondary">Pay</button>
                }
            </div>
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
                {/* <Link to='/dashboard/payment'><button className="btn btn-sm btn-primary mt-2">Pay</button></Link> */}
              </div>
            </div>
                )
                }
            </div>
        </div>
    );
};

export default BoughtProperties;