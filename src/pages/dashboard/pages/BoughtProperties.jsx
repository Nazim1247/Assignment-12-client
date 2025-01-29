import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet";
import { Slide } from "react-awesome-reveal";
import { FaUser } from "react-icons/fa";

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
        <Slide duration={2000} delay={100} direction='right'>
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
                  className=" w-full h-40 rounded-xl" />
              </figure>
              <div className="p-4 space-y-2">
                <h2 className="card-title text-green-600 text-xl">{offer.title}</h2>
                <h3 className="flex items-center gap-1 text-md font-semibold"><FaUser />Agent:  {offer.agentName}</h3>
                <p className="flex items-center gap-1"><IoLocationSharp className="text-green-600"/>{offer.location}</p>
                <div className="flex items-center justify-between">
                <p className="font-semibold">Status:{offer.status!=='accepted'?<span className="text-pink-600 border rounded-3xl px-2 ml-1">{offer.status}</span>:<span className="text-green-600 border rounded-3xl px-2 ml-1">{offer.status}</span>}</p>
                <p className="text-green-600 border rounded-3xl px-3">${offer.amount}</p>
                </div>
                {offer.status==='accepted'?
                <Link to={`/dashboard/payment/${offer._id}`}><button className="btn btn-sm btn-primary mt-2 w-full">Pay</button></Link>
                :
                <button disabled className="btn btn-sm btn-primary w-full mt-2">Pay</button>}
              </div>
            </div>
                )
                }
            </div>
        </div>
        </Slide>
    );
};

export default BoughtProperties;