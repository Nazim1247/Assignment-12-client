import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManegeUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = [], isLoading, refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/users')
            return data;
        }
    })

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>

    const handleMark = (user)=>{
      // console.log(user);
    }

    const handleMakeAgent = async(user)=>{
        await axiosSecure.patch(`/users/agent/${user._id}`)
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

    const handleMakeAdmin = async (user)=>{
        await axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            // console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Is an admin now!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleDelete = (user)=>{
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
                await axiosSecure.delete(`/users/${user._id}`)
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
            <div className="bg-primary mb-4 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">All Users: ({users.length})</h2>
            </div>
            <div>
            <div className="overflow-x-auto">
                    <table className="table w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Make Admin</th>
                          <th>Make Agent</th>
                          <th>Mark as fraud</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => <tr key={user._id}>
                          <th>{i + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            { user?.role === 'admin'? 'Admin': <button onClick={()=>handleMakeAdmin(user)} className="btn btn-xs btn-primary" disabled={user?.role==='agent'}>Make Admin</button>}
                            </td>
                          <td>
                          { user?.role === 'agent'? 'Agent': <button onClick={()=>handleMakeAgent(user)} className="btn btn-xs btn-primary" disabled={user?.role==='admin'}>Make Agent</button>}
                          </td>
                          <td>
                          <button onClick={()=>handleMark(user)} className="btn btn-xs btn-primary">Mark as fraud</button>
                          </td>
                          <td>
                            <button onClick={()=> handleDelete(user)} className="btn btn-xs btn-secondary" disabled={user?.role==='admin' || user?.role ==='agent'}>Delete</button>
                          </td>
                        </tr>)}
                        
                      </tbody>
                    </table>
                  </div>
            </div>
        </div>
    );
};

export default ManegeUsers;