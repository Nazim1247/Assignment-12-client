import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllProperties from "../pages/AllProperties";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../errorPage/ErrorPage";
import AddProperty from "../pages/AddProperty";
import PropertyDetails from "../pages/PropertyDetails";
import UserProfile from "../pages/dashboard/pages/UserProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'allProperties',
                element: <AllProperties></AllProperties>
            },
            {
                path: 'propertyDetails/:id',
                element: <PropertyDetails></PropertyDetails>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // user dashboard
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'wishlist',
                element: <h2>wishlist</h2>
            },
            {
                path: 'boughtProperties',
                element: <h2>property bought</h2>
            },
            {
                path: 'myReviews',
                element: <h2>my reviews</h2>
            },
            // agent dashboard
            {
                path: 'agentProfile',
                element: <h2>agent profile</h2>
            },
            {
                path: 'addProperty',
                element: <AddProperty></AddProperty>
            },
            {
                path: 'addedProperties',
                element: <h2>my added properties</h2>
            },
            {
                path: 'soldProperties',
                element: <h2>my sold properties</h2>
            },
            {
                path: 'requestedProperties',
                element: <h2>requested properties</h2>
            },
            // admin dashboard
            {
                path: 'adminProfile',
                element: <h2>admin profile</h2>
            },
        ]
    },
])

export default router;