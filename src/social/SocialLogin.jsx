import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const navigate = useNavigate();
    const {googleLogin}=useContext(AuthContext);

    const handleGoogleLogin = ()=>{
        googleLogin()
        .then(result =>{
            navigate('/')
            console.log(result.user)
        })
    }
    return (
        <div>
            <button type="button" onClick={handleGoogleLogin}>Continue With Google</button>
        </div>
    );
};

export default SocialLogin;