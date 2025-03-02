import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import lottie from '../assets/lottie1.json';
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../social/SocialLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    const {createUser,setUser,updateUser} = useContext(AuthContext);

    // const handleSubmit = e =>{
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const photo = form.photo.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(name,photo,email,password)

    //     createUser(email,password)
    //     .then(result =>{
    //         setUser({
    //             ...result.user,photoUrl: photo
    //         })

    //         //update user
    //         updateUser({displayName: name, photoURL: photo})
    //         navigate('/')
    //         console.log(result.user)
    //     })
    //     .catch(error =>{
    //         console.log(error.message)
    //     })
    // }

    const onSubmit = (data)=>{
      createUser(data.email,data.password)
      .then(result =>{
        setUser({
          ...result.user,photoURL: data.photo,
        })
        // update user
        updateUser(data.name, data.photo)
        .then(async()=>{
          // save user in db
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photo,
          }
          await axiosPublic.post('/users',userInfo)
          .then(res =>{
            if(res.data.insertedId){
              // console.log('user added')
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Register Successfully!!",
                showConfirmButton: false,
                timer: 1500
                });
                navigate('/');
            }
          })
        })
      })
      .catch(error =>{
        console.log(error.message)
      })
    }

    return (
        <Zoom>
          <div>
          <Helmet>
                <title>Dream House | Register</title>
            </Helmet>
            <div className="hero w-11/12 mx-auto">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Register now!</h1>
      <Lottie animationData={lottie}></Lottie>
    </div>
    <div className="card w-full shadow dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <p className='text-center mb-2'>Already Have an Account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
        <button type='button' className='btn text-center bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 border-none'>
            <SocialLogin></SocialLogin>
        </button>
        <div className="divider dark:bg-gray-700">OR</div>
        <div className="form-control">
          <label className="label">
            <span>Name</span>
          </label>
          <input type="text" {...register("name")} name='name' placeholder="name" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span>Photo url</span>
          </label>
          <input type="text" {...register("photo")} name='photo' placeholder="photo url" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span>Email</span>
          </label>
          <input type="email" {...register("email")} name='email' placeholder="email" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span>Password</span>
          </label>
          <input type="password" {...register("password",{ required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/ })} name='password' placeholder="password" className="input input-bordered bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100" required />
          {errors.password && <span className='text-red-600'>Password must be 6 characters long</span>}
          {errors.password && <span className='text-red-600'>Password must have one uppercase, one lowercase, and one special character required</span>}
        </div>
        <div className="form-control mt-6">
        <input type='submit' value='Register' className="btn btn-primary"/>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
        </Zoom>
    );
};

export default Register;