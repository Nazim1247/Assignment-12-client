import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";


const UserProfile = () => {
    const {user} = useContext(AuthContext);
    
    return (
        <Zoom>
            <div className="text-center py-6 space-y-2 dark:bg-gray-800 rounded-lg">
            <Helmet>
                <title>Dream House | Dashboard | User Profile</title>
            </Helmet>
            <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />
            <h2 className="text-green-600 text-2xl"><span className="font-semibold">Name:</span> {user?.displayName}</h2>
            <p className="text-lg"><span className="font-semibold">Email:</span> {user?.email}</p>
        </div>
        </Zoom>
    );
};

export default UserProfile;