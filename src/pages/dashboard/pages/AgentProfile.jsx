// import { useContext } from "react";
// import { AuthContext } from "../../../provider/AuthProvider";
import useAgent from "../../../hooks/useAgent";



const AgentProfile = () => {
    // const {user} = useContext(AuthContext);
    const [isAgent] = useAgent();
    // console.log(isAgent)
    return (
        <div className="text-center p-10 space-y-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={isAgent?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">{isAgent?.user?.name}</h2>
            <p>{isAgent?.user?.email}</p>
            <p>{isAgent?.user?.role}</p>
        </div>
        // <div className="text-center p-10 space-y-2">
        //     <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />
        //     <h2 className="text-xl font-bold text-green-600">{user?.displayName}</h2>
        //     <p>{user?.email}</p>
        //     <p>{user?.role}</p>
        // </div>
    );
};

export default AgentProfile;