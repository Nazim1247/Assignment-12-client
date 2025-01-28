import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";

const BoughtProperties = () => {
    const {user}=useContext(AuthContext);
    const [offers, setOffers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        const fetchAllOffers = async ()=>{
            const {data} = await axiosSecure.get(`/offers/${user?.email}`)
            return setOffers(data);
        }
        fetchAllOffers();
    },[])

    return (
        <Zoom>
            <div className="">
            <Helmet>
                <title>Dream House | Dashboard | My Bought Properties</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-md">
                <h2 className="text-2xl font-bold text-white">All Bought Properties: ({offers.length})</h2>
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
                <h2 className="card-title text-green-600 text-xl">{offer.title}</h2>
                <h3 className="text-md font-semibold">Agent:  {offer.agentName}</h3>
                <div className="flex items-center justify-between">
                <p className="flex items-center"><IoLocationSharp className="text-green-600"/>{offer.location}</p>
                <p className="text-green-600 border rounded-3xl px-1">${offer.amount}</p>
                </div>
                <p>Status: {offer.status}</p>
                {offer.status==='accepted'?
                <Link to={`/dashboard/payment/${offer._id}`}><button className="btn btn-sm btn-primary mt-2">Pay</button></Link>
                :
                <button disabled className="btn btn-sm btn-primary mt-2">Pay</button>}
              </div>
            </div>
                )
                }
            </div>
        </div>
        </Zoom>
    );
};

export default BoughtProperties;