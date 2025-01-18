import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex w-11/12 mx-auto my-8">
            <div className="w-64 min-h-screen bg-primary">
                <ul className="menu">
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
    );
};

export default Dashboard;