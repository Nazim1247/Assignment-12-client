import Lottie from 'lottie-react';
import lottie from '../assets/lottie2.json';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../social/SocialLogin';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Zoom } from 'react-awesome-reveal';

const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useContext(AuthContext);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email,password)
        .then(result =>{
            navigate(from, {replace: true})
            if(result.user){
              Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Login Successfully!!",
              showConfirmButton: false,
              timer: 1500
              });
            }
        })
        .catch(error =>{
          console.log(error.message)
        })
    }
 
    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Login</title>
            </Helmet>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Login now!</h1>
      <Lottie className='lg:w-96' animationData={lottie}></Lottie>
    </div>
    <div className="card w-full shadow border">
      <form onSubmit={handleSubmit} className="card-body">
        <p className='text-center mb-2'>New to This Page? <Link className='text-red-600' to={'/register'}>Register</Link></p>
        <button type='button' className='btn text-center bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-none'>
            <SocialLogin></SocialLogin>
        </button>
        <div className="divider">OR</div>
        <div className="form-control">
          <label className="label">
            <span>Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span>Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
        </Zoom>
    );
};

export default Login;