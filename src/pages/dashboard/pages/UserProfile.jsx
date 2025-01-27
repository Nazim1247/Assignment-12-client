import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";


const UserProfile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="text-center py-6 space-y-2 border rounded-lg">
            <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />
            <h2 className="text-green-600 text-2xl">Name: {user?.displayName}</h2>
            <p className="text-lg">Email: {user?.email}</p>
        </div>
    );
};

export default UserProfile;