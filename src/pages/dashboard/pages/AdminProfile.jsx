
import { Helmet } from "react-helmet";
import useAdmin from "../../../hooks/useAdmin";
import { Zoom } from "react-awesome-reveal";

const AdminProfile = () => {
    
    const [isAdmin] = useAdmin();
    // console.log(isAdmin)
    return (
        <Zoom>
            <div className="text-center py-6 space-y-2 dark:bg-gray-800 rounded-lg">
            <Helmet>
                <title>Dream House | Dashboard | Admin Profile</title>
            </Helmet>
            <img className="w-32 h-32 rounded-full mx-auto" src={isAdmin?.user?.photo} alt="" />
            <h2 className="text-xl text-green-600"><span className="font-semibold">Name:</span> {isAdmin?.user?.name}</h2>
            <p><span className="font-semibold">Email:</span> {isAdmin?.user?.email}</p>
            <p><span className="font-semibold">Role:</span> {isAdmin?.user?.role}</p>
        </div>
        </Zoom>
    );
};

export default AdminProfile;