// import { useContext } from "react";
// import { AuthContext } from "../../../provider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";


const AdminProfile = () => {
    // const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    // console.log(isAdmin)
    return (
        <div className="text-center p-10 space-y-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={isAdmin?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">{isAdmin?.user?.name}</h2>
            <p>{isAdmin?.user?.email}</p>
            <p>{isAdmin?.user?.role}</p>
        </div>
    //     <div className="text-center p-10 space-y-2">
    //     <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />
    //     <h2 className="text-xl font-bold text-green-600">{user?.displayName}</h2>
    //     <p>{user?.email}</p>
    //     <p>{user?.role}</p>
    // </div>
    );
};

export default AdminProfile;