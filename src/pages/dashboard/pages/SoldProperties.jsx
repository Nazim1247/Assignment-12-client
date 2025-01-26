import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const SoldProperties = () => {
    const axiosSecure = useAxiosSecure();
    const {data: payments = [], isLoading, refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/payments')
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
    return (
        <div>
            <h2>sold properties: {payments.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Property Title</th>
        <th>Location</th>
        <th>Bayer Name</th>
        <th>Bayer Email</th>
        <th>Sold Price</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment,index) => <tr key={payment._id}>
        <th>{index +1}</th>
        <td>{payment.title}</td>
        <td>{payment.location}</td>
        <td>{payment.name}</td>
        <td>{payment.email}</td>
        <td>{payment.price}</td>
      </tr>)}
      

    </tbody>
  </table>
</div>
        </div>
    );
};

export default SoldProperties;