import { useContext } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
import HistoryCard from "./HistoryCard";
import { useQuery } from "@tanstack/react-query";


const PaymentHistory = () => {
    // const [payments,setPayments]=useState([]);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // useEffect(()=>{
    //     const fetchPayment =async()=>{
    //         await axiosSecure.get(`/payment/${user?.email}`)
    //         .then(res => {
    //             setPayments(res.data)
    //         })
    //     }
    //     fetchPayment();
    // },[])
    
    const {data: payments = [], isLoading, refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/payment/${user?.email}`)
            return data;
        }
    })

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    return (
        <div>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Payments: ({payments.length})</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {payments.map(payment => <HistoryCard key={payment._id} payment={payment} refetch={refetch}></HistoryCard>)}
            </div>
        </div>
    );
};

export default PaymentHistory;