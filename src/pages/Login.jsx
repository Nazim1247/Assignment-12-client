import Lottie from 'lottie-react';
import lottie from '../assets/lottie2.json';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../social/SocialLogin';
import Swal from 'sweetalert2';

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
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Login now!</h1>
      <Lottie className='lg:w-96' animationData={lottie}></Lottie>
    </div>
    <div className="card bg-base-100 w-full shadow">
      <form onSubmit={handleSubmit} className="card-body">
        <p className='text-center'>New to This Page? <Link className='text-red-600' to={'/register'}>Register</Link></p>
        <button type='button' className='btn text-center'>
            <SocialLogin></SocialLogin>
        </button>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;