import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAgent from "../../hooks/useAgent";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    // console.log(isAdmin)
    return (
        <div>
            <h2 className="text-center text-3xl font-bold mt-6 text-green-600">Dashboard</h2>
            <div className="md:flex w-11/12 mx-auto my-6 gap-4">
            <div className="w-64 min-h-screen bg-gray-200 rounded-lg">
                <ul className="menu">

                {
                    isAdmin.admin ?  <>
                    <li><NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink></li>
                    <li><NavLink to='/dashboard/manegeProperties'>Manege Properties</NavLink></li>
                    <li><NavLink to='/dashboard/manegeUsers'>Manege Users</NavLink></li>
                    <li><NavLink to='/dashboard/manegeReviews'>Manege Reviews</NavLink></li>
                    <li><NavLink to='/dashboard/advertiseProperties'>Advertise Properties</NavLink></li>
                    </>
                    :
                    isAgent.agent ?
                    <>
                    <li><NavLink to='/dashboard/agentProfile'>Agent Profile</NavLink></li>
                    <li><NavLink to='/dashboard/addProperty'>Add Property</NavLink></li>
                    <li><NavLink to='/dashboard/addedProperties'>My Added Properties</NavLink></li>
                    <li><NavLink to='/dashboard/soldProperties'>My Sold Properties</NavLink></li>
                    <li><NavLink to='/dashboard/requestedProperties'>Requested Properties</NavLink></li>
                    </> 
                    :
                    <>
                    <li><NavLink to='/dashboard/userProfile'>User Profile</NavLink></li>
                <li><NavLink to='/dashboard/wishlist'>Wishlist</NavLink></li>
                <li><NavLink to='/dashboard/boughtProperties'>Bought Properties</NavLink></li>
                <li><NavLink to='/dashboard/myReviews'>My Reviews</NavLink></li>
                    </>
                }

                    <div className="divider"></div>

                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/allProperties'>All Properties</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;