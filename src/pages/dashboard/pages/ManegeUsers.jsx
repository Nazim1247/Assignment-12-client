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
            All Users: {users.length}
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
                          <td>Blue</td>
                          <td>Blue</td>
                          <td>Blue</td>
                          <td>
                            <button onClick={()=> handleDelete(user)} className="btn btn-xs btn-secondary">Delete</button>
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