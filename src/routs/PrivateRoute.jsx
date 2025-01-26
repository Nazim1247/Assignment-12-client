import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";


const PrivateRoute = ({children}) => {
    const [isAgent] = useAgent();
    const [isAdmin] = useAdmin();
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
    }

    if(user && !isAdmin.admin && !isAgent.agent){
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;