import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import lottie from '../assets/lottie1.json';
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../social/SocialLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

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
        updateUser(data.name, data.photoURL)
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
              console.log('user added')
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
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Register now!</h1>
      <Lottie className="lg:w-[500px]" animationData={lottie}></Lottie>
    </div>
    <div className="card bg-base-100 w-full shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <p className='text-center'>Already Have an Account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
        <button type='button' className='btn text-center'>
            <SocialLogin></SocialLogin>
        </button>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo url</span>
          </label>
          <input type="text" {...register("photo")} name='photo' placeholder="photo url" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password",{ required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/ })} name='password' placeholder="password" className="input input-bordered" required />
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
    );
};

export default Register;