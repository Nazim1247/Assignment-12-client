import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAgent from "../hooks/useAgent";
import { Navigate, useLocation } from "react-router-dom";


const AgentRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAgent, isAgentLoading] = useAgent();
    const location = useLocation();
        // console.log('loading',loading)
    
        if(loading || isAgentLoading){
            return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>
        }
    
        if(user && isAgent?.agent){
            return children;
        }
        return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default AgentRoute;