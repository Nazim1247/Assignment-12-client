import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import lottie from '../assets/lottie1.json';
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../social/SocialLogin";

const Register = () => {
    const navigate = useNavigate();

    const {createUser} = useContext(AuthContext);

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,photo,email,password)

        createUser(email,password)
        .then(result =>{
            navigate('/')
            console.log(result.user)
        })
    }

    return (
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Register now!</h1>
      <Lottie className="lg:w-[500px]" animationData={lottie}></Lottie>
    </div>
    <div className="card bg-base-100 w-full shadow">
      <form onSubmit={handleSubmit} className="card-body">
        <p className='text-center'>Already Have an Account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
        <button type='button' className='btn text-center'>
            <SocialLogin></SocialLogin>
        </button>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo url</span>
          </label>
          <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
        </div>
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
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;