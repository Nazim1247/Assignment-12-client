import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";


const AgentProfile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="text-center p-10 space-y-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>
        </div>
    );
};

export default AgentProfile;