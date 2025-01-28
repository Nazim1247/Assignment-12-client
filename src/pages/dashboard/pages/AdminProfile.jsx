
import { Helmet } from "react-helmet";
import useAdmin from "../../../hooks/useAdmin";

const AdminProfile = () => {
    
    const [isAdmin] = useAdmin();
    // console.log(isAdmin)
    return (
        <div className="text-center py-6 space-y-2 border rounded-lg">
            <Helmet>
                <title>Dream House | Dashboard | Admin Profile</title>
            </Helmet>
            <img className="w-32 h-32 rounded-full mx-auto" src={isAdmin?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">Name: {isAdmin?.user?.name}</h2>
            <p>Email: {isAdmin?.user?.email}</p>
            <p>Role: {isAdmin?.user?.role}</p>
        </div>
    );
};

export default AdminProfile;