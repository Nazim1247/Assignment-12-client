
import { Helmet } from "react-helmet";
import useAgent from "../../../hooks/useAgent";

const AgentProfile = () => {

    const [isAgent] = useAgent();
    // console.log(isAgent)
    return (
        <div className="text-center py-6 space-y-2 border rounded-lg">
            <Helmet>
                <title>Dream House | Dashboard | Agent Profile</title>
            </Helmet>
            <img className="w-32 h-32 rounded-full mx-auto" src={isAgent?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">Name: {isAgent?.user?.name}</h2>
            <p>Email: {isAgent?.user?.email}</p>
            <p>Role: {isAgent?.user?.role}</p>
        </div>
    );
};

export default AgentProfile;