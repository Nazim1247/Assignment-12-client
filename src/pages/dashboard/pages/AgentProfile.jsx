import useAgent from "../../../hooks/useAgent";



const AgentProfile = () => {
    const [isAgent] = useAgent();
    return (
        <div className="text-center p-10 space-y-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={isAgent?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">{isAgent?.user?.name}</h2>
            <p>{isAgent?.user?.email}</p>
            <p>{isAgent?.user?.role}</p>
        </div>
    );
};

export default AgentProfile;