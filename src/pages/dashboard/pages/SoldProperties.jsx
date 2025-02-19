import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAgent from "../../../hooks/useAgent";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const SoldProperties = () => {
  const [isAgent] = useAgent();
    const axiosSecure = useAxiosSecure();
    const {data: payments = [], isLoading, refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/payments/${isAgent?.user?.email}`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const totalAmount = payments.reduce((total,property)=> total + property.price,0);
    // console.log(totalAmount)

    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Dashboard | My Sold Properties</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Sold Properties: ({payments.length})</h2>
            </div>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="text-gray-900 dark:text-gray-100">
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
        <td><span className="text-green-600 border rounded-3xl px-3 font-semibold">${payment.price}</span></td>
      </tr>)}
      

    </tbody>
  </table>
</div>
<div className="divider"></div>
<div>
  <h2 className="text-2xl text-center font-bold">Total Sold Amount: <span className="text-green-600 border rounded-3xl px-4">${totalAmount}</span></h2>
</div>
        </div>
        </Zoom>
    );
};

export default SoldProperties;