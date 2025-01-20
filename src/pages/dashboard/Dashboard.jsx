import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <h2 className="text-center text-2xl font-bold mt-6">Dashboard</h2>
            <div className="flex w-11/12 mx-auto my-6 gap-4">
            <div className="w-64 min-h-screen bg-primary">
                <ul className="menu">
                <li><NavLink to='/dashboard/userProfile'>User Profile</NavLink></li>
                <li><NavLink to='/dashboard/wishlist'>Wishlist</NavLink></li>
                <li><NavLink to='/dashboard/boughtProperties'>Bought Properties</NavLink></li>
                <li><NavLink to='/dashboard/myReviews'>My Reviews</NavLink></li>

                    <li><NavLink to='/dashboard/agentProfile'>Agent Profile</NavLink></li>
                    <li><NavLink to='/dashboard/addProperty'>Add Property</NavLink></li>
                    <li><NavLink to='/dashboard/addedProperties'>My added properties</NavLink></li>
                    <li><NavLink to='/dashboard/soldProperties'>My sold properties</NavLink></li>
                    <li><NavLink to='/dashboard/requestedProperties'>Requested properties</NavLink></li>
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