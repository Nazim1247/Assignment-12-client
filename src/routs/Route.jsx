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
import Wishlist from "../pages/dashboard/pages/Wishlist";
import MakeOffer from "../pages/dashboard/pages/MakeOffer";
import AgentProfile from "../pages/dashboard/pages/AgentProfile";
import AddedProperties from "../pages/dashboard/pages/AddedProperties";
import UpdateProperty from "../pages/dashboard/pages/UpdateProperty";
import BoughtProperties from "../pages/dashboard/pages/BoughtProperties";
import MyReviews from "../pages/dashboard/pages/MyReviews";
import PrivateRoute from "./PrivateRoute";
import ManegeUsers from "../pages/dashboard/pages/ManegeUsers";
import AdminProfile from "../pages/dashboard/pages/AdminProfile";
import ManegeProperties from "../pages/dashboard/pages/ManegeProperties";
import ManegeReviews from "../pages/dashboard/pages/ManegeReviews";
import AdminRoute from "./AdminRoute";
import Payment from "../pages/dashboard/pages/payment/Payment";
import RequestedProperties from "../pages/dashboard/pages/RequestedProperties";
import AgentRoute from "./AgentRoute";
import SoldProperties from "../pages/dashboard/pages/SoldProperties";
import AdvertiseProperties from "../pages/dashboard/advertiseProperties/AdvertiseProperties";
import PaymentHistory from "../pages/dashboard/pages/payment/PaymentHistory";
import FeaturedSection from "../components/FeaturedSection";
import OfferSection from "../components/OfferSection";
import ContactUs from "../components/ContactUs";
import Welcome from "../welcome/Welcome";

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
            {
                path: 'featured',
                element: <FeaturedSection></FeaturedSection>
            },
            {
                path: 'offers',
                element: <OfferSection></OfferSection>
            },
            {
                path: 'contactUs',
                element: <ContactUs></ContactUs>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // user dashboard
            {
                path: 'welcome',
                element: <Welcome></Welcome>
            },
            {
                path: 'userProfile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: 'wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: 'makeOffer/:id',
                element: <PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>
            },
            {
                path: 'boughtProperties',
                element: <PrivateRoute><BoughtProperties></BoughtProperties></PrivateRoute>
            },
            {
                path: 'myReviews',
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            {
                path: 'paymentHistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            {
                path: 'payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: ({params})=> fetch(`https://assignment-12-server-phi-eight.vercel.app/offer/${params.id}`)
            },
            // agent dashboard
            {
                path: 'agentProfile',
                element: <AgentRoute><AgentProfile></AgentProfile></AgentRoute>
            },
            {
                path: 'addProperty',
                element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
            },
            {
                path: 'addedProperties',
                element: <AgentRoute><AddedProperties></AddedProperties></AgentRoute>
            },
            {
                path: 'updateProperty/:id',
                element: <AgentRoute><UpdateProperty></UpdateProperty></AgentRoute>,
                loader: ({params})=> fetch(`https://assignment-12-server-phi-eight.vercel.app/properties/${params.id}`)
            },
            {
                path: 'soldProperties',
                element: <AgentRoute><SoldProperties></SoldProperties></AgentRoute>
            },
            {
                path: 'requestedProperties',
                element: <AgentRoute><RequestedProperties></RequestedProperties></AgentRoute>
            },
            // admin dashboard
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manegeProperties',
                element: <AdminRoute><ManegeProperties></ManegeProperties></AdminRoute>
            },
            {
                path: 'manegeUsers',
                element: <AdminRoute><ManegeUsers></ManegeUsers></AdminRoute>
            },
            {
                path: 'manegeReviews',
                element: <AdminRoute><ManegeReviews></ManegeReviews></AdminRoute>
            },
            {
                path: 'advertiseProperties',
                element: <AdminRoute><AdvertiseProperties></AdvertiseProperties></AdminRoute>
            },
        ]
    },
])

export default router;