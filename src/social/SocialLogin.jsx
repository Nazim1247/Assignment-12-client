import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {googleLogin}=useContext(AuthContext);

    const handleGoogleLogin = ()=>{
        googleLogin()
        .then(result =>{
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                photo: result.user?.photoURL,
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log('google user added')
                navigate('/')
                if(res.data.insertedId){
                    Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Login Successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                }
            })

        })
    }
    return (
        <div>
            <button type="button" onClick={handleGoogleLogin}>Continue With Google</button>
        </div>
    );
};

export default SocialLogin;