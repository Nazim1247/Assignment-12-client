import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const HistoryCard = ({payment,refetch}) => {
    // console.log(payment)
    const axiosSecure = useAxiosSecure();
    const {image,title,location,date,transactionId,price,_id} = payment || {};

    const handleRemove = (id)=>{
        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                        refetch()
                        await axiosSecure.delete(`/delete-payment/${id}`)
                        .then(res =>{
                            if(res.data.deletedCount > 0){
                                refetch();
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "user has been deleted.",
                                  icon: "success"
                                });
                            }
                        })
                    }
                  });
    }
    
    return (
        
<div>
<div className="card shadow h-full flex flex-col justify-between">
              <figure className="p-4">
                <img
                  src={image}
                  alt=""
                  className="w-full h-40 rounded-xl" />
              </figure>
              <div className="p-4 space-y-2">
                <h2 className="card-title text-green-600 text-2xl">{title}</h2>
                <p className="flex items-center gap-2"><IoLocationSharp className="text-green-600"/>{location}</p>
                <p><span className='font-semibold'>Date:</span> {date}</p>
                <p className='font-semibold'>Transaction Id:</p>
                <p>{transactionId}</p>
                <div className='flex items-center justify-between'>
                <button onClick={()=>handleRemove(_id)} className="btn btn-sm btn-secondary">Remove</button>
                <p className="text-green-600 border rounded-3xl px-3 font-semibold">Price: ${price}</p>
                </div>
              </div>
            </div>
</div>
        
    );
};

export default HistoryCard;