import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAgent from "../../../hooks/useAgent";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const RequestedProperties = () => {
  const [isAgent] = useAgent();
    const axiosSecure = useAxiosSecure();
    const {data: offers, isLoading, refetch} = useQuery({
        queryKey: ['offers'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/requested-offers/${isAgent?.user?.email}`)
            return data;
        }
    })
    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleAccept = async (id)=>{
      await axiosSecure.patch(`/offer/accept/${id}`)
              .then(res =>{
                  // console.log(res.data)
                  if(res.data.modifiedCount > 0){
                      refetch();
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Is an agent now!",
                          showConfirmButton: false,
                          timer: 1500
                        });
                  }
              })
    }

    const handleReject = async (id)=>{
      await axiosSecure.patch(`/offer/reject/${id}`)
      .then(res =>{
          // console.log(res.data)
          if(res.data.modifiedCount > 0){
              refetch();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Is an agent now!",
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      })
    }
    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Dashboard | My Requested Properties</title>
            </Helmet>
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Requested Properties: ({offers.length})</h2>
            </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="text-gray-900 dark:text-gray-100">
      <tr>
        <th>#</th>
        <th>Property Title</th>
        <th>Location</th>
        <th>Bayer</th>
        <th>Bayer Email</th>
        <th>Price</th>
        <th>Accept</th>
        <th>Reject</th>
      </tr>
    </thead>
    <tbody>
      {
        offers.map((offer,index) => 
        <tr key={offer._id}>
        <th>{index +1}</th>
        <td>{offer.title}</td>
        <td>{offer.location}</td>
        <td>{offer.bayerName}</td>
        <td>{offer.bayerEmail}</td>
        <td><span className="text-green-600 border rounded-3xl px-3 font-semibold">${offer.amount}</span></td>
        <td>
            {offer.status ==='accepted'?<p className="text-green-600 border rounded-3xl px-2 font-semibold">Accepted</p>:
            <button onClick={()=>handleAccept(offer._id)} className="btn btn-xs btn-primary" disabled={offer.status==='rejected'}>Accept</button>}
        </td>
        <td>
        {offer.status==='rejected'?<p className="text-red-600 border rounded-3xl px-2 font-semibold">Rejected</p>:
        <button onClick={()=>handleReject(offer._id)} className="btn btn-xs btn-secondary" disabled={offer.status==='accepted'}>Reject</button>}
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
            </div>
        </div>
        </Zoom>
    );
};

export default RequestedProperties;