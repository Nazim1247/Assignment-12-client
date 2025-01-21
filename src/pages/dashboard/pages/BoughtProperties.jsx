import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


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
        </div>
    );
};

export default BoughtProperties;