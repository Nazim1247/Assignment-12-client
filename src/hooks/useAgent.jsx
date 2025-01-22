import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAgent = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isAgent = []} = useQuery({
        queryKey: [user?.email, 'isAgent'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/agent/${user?.email}`);
            // console.log(res.data);
            return res.data?.agent;
        }
    })
    return [isAgent];
};

export default useAgent;