import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
        // console.log('loading',loading)
    
        if(loading || isAdminLoading){
            return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
        }
    
        if(user && isAdmin){
            return children;
        }
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;