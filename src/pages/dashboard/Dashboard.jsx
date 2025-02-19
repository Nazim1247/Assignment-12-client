import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAgent from "../../hooks/useAgent";
import { Helmet } from "react-helmet";
import { Slide } from "react-awesome-reveal";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    // console.log(isAdmin)
    return (
        <Slide duration={2000} delay={100}>
            <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <Helmet>
                <title>Dream House | Dashboard</title>
            </Helmet>
            <div className="flex justify-center items-center gap-8">

<div className="dropdown mt-6">
<div tabIndex={1} role="button" className=" lg:hidden">
<svg
xmlns="http://www.w3.org/2000/svg"
className="h-8 w-8"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor">
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M4 6h16M4 12h8m-8 6h16" />
</svg>
</div>
<ul
tabIndex={1}
className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

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
    <li><NavLink to='/dashboard/paymentHistory'>Payment History</NavLink></li>
        </>
    }

        <div className="divider"></div>

        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allProperties'>All Properties</NavLink></li>

</ul>
</div>
<h2 className="text-center text-3xl font-bold mt-6 text-green-600">Dashboard</h2>
            </div>

            <div className="md:flex w-11/12 mx-auto gap-4 py-6">
            <div className="w-64 rounded-lg hidden lg:flex bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
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
                <li><NavLink to='/dashboard/paymentHistory'>Payment History</NavLink></li>
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
        </Slide>
    );
};

export default Dashboard;