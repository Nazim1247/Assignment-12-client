import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    
    // img upload to imgbb and then get an url
    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type':'multipart/form-data'
        }
    })
    if(res.data.success){
      const propertyData = {
        agentName: user?.displayName,
        agentEmail: user?.email,
        agentImage: user?.photoURL,
        title: data.title,
        location: data.location,
        price: parseFloat(data.price),
        description: data.description,
        image: res.data.data.display_url,
        status: 'pending'
      }
      //save property to database
      await axiosSecure.post('/properties',propertyData)
      .then(res =>{
        if(res.data.insertedId){
          navigate('/dashboard/addedProperties')
          Swal.fire({
          position: "top-center",
          icon: "success",
          title: "property has been added",
          showConfirmButton: false,
          timer: 1500
          });
        }
      })
    }
  }

    return (
        <Zoom>
      <div>
          <Helmet>
                <title>Dream House | Dashboard | Add Properties</title>
            </Helmet>
            <div className="hero">
  <div className="hero-content flex-col w-full">
      <div className="bg-primary p-2 rounded-t-lg w-full">
      <h1 className="text-2xl font-bold text-white text-center">Add a Property</h1>
      </div>
    <div className="card w-full shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")}
          defaultValue={user.displayName}
          placeholder="name" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")}
          defaultValue={user.email}
          placeholder="email" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input type="text" {...register("title")} placeholder="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Location</span>
          </label>
          <input type="text" {...register("location")} placeholder="Location" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <input type="number" {...register("price")} placeholder="price" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea {...register("description")} className="textarea textarea-bordered" placeholder="Description" required></textarea>
          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <input
           type="file"
           {...register("image")}
           className="file-input file-input-bordered file-input-primary w-full" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add Property</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
        </Zoom>
    );
};

export default AddProperty;