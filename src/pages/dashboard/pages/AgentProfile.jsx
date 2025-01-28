
import { Helmet } from "react-helmet";
import useAgent from "../../../hooks/useAgent";
import { Zoom } from "react-awesome-reveal";

const AgentProfile = () => {

    const [isAgent] = useAgent();
    // console.log(isAgent)
    return (
        <Zoom>
            <div className="text-center py-6 space-y-2 border rounded-lg">
            <Helmet>
                <title>Dream House | Dashboard | Agent Profile</title>
            </Helmet>
            <img className="w-32 h-32 rounded-full mx-auto" src={isAgent?.user?.photo} alt="" />
            <h2 className="text-xl text-green-600"><span className="font-semibold">Name:</span> {isAgent?.user?.name}</h2>
            <p><span className="font-semibold">Email:</span> {isAgent?.user?.email}</p>
            <p><span className="font-semibold">Role:</span> {isAgent?.user?.role}</p>
        </div>
        </Zoom>
    );
};

export default AgentProfile;