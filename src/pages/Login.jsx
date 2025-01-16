import Lottie from 'lottie-react';
import lottie from '../assets/lottie2.json';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useContext(AuthContext);

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        loginUser(email,password)
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
      <h1 className="text-2xl font-bold">Login now!</h1>
      <Lottie animationData={lottie}></Lottie>
    </div>
    <div className="card bg-base-100 w-full shadow">
      <form onSubmit={handleSubmit} className="card-body">
        <p className='text-center'>New to This Page? <Link className='text-red-600' to={'/register'}>Register</Link></p>
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