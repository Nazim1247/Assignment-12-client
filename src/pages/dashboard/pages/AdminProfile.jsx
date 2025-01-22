import useAdmin from "../../../hooks/useAdmin";


const AdminProfile = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin)
    return (
        <div className="text-center p-10 space-y-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={isAdmin?.user?.photo} alt="" />
            <h2 className="text-xl font-bold text-green-600">{isAdmin?.user?.name}</h2>
            <p>{isAdmin?.user?.email}</p>
            <p>{isAdmin?.user?.role}</p>
        </div>
    );
};

export default AdminProfile;