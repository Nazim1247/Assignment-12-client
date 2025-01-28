import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";



const UpdateProperty = () => {
  const navigate = useNavigate();
    const property = useLoaderData();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const {title, image, price, location, agentName, agentEmail, _id}= property || {};

    const onSubmit = async (data)=>{
        const propertyData = {
            title: data.title,
            location: data.location,
            price: parseFloat(data.price),
            image: data.image,
          }
          //update property to database
      const propertyRes = await axiosSecure.patch(`/properties/${_id}`,propertyData)
      
      if(propertyRes.data.modifiedCount > 0){
        navigate('/dashboard/addedProperties')
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "property updated successfully!",
            showConfirmButton: false,
            timer: 1500
            });
      }
    
    }
    return (
        <div>
          <Helmet>
                <title>Dream House | Dashboard | Update Properties</title>
            </Helmet>
            <div className="hero">
  <div className="hero-content flex-col w-full">
    <div className="bg-primary p-2 rounded-t-lg w-full">
      <h1 className="text-2xl font-bold text-white text-center">Update Your Property</h1>
      
    </div>
    <div className="card w-full shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input type="text" {...register("name")}
          defaultValue={agentName}
          placeholder="name" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agent Email</span>
          </label>
          <input type="email" {...register("email")}
          defaultValue={agentEmail}
          placeholder="email" className="input input-bordered" readOnly />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input type="text" {...register("title")}
          defaultValue={title}
          placeholder="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Location</span>
          </label>
          <input type="text" {...register("location")}
          defaultValue={location}
          placeholder="Location" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <input type="number" {...register("price")} 
          defaultValue={price}
          placeholder="price" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <input
           type="text"
           {...register("image")}
           defaultValue={image}
           className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Property</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default UpdateProperty;