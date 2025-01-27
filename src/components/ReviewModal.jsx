import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ReviewModal = ({ isOpen, closeModal, property }) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const rev = e.target.review.value;
        const date = e.target.date.value;
        
        const reviewInfo = {
          name,
          photo,
          email,
            rev,
            date,
            property
        }
        await axiosSecure.post('/reviews', reviewInfo)
        navigate('/dashboard/myReviews')
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Review has been added",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <>

        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className=" lg:w-1/2 mx-auto space-y-4 border bg-white p-12">
        <DialogTitle className="font-bold">Add a Review</DialogTitle>
        <Description>Review Form</Description>
        <form onSubmit={handleSubmit} className='w-full space-y-1'>
        <div className="form-control">
          <input type="text" name='name' defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <input type="text" name='photo' defaultValue={user?.photoURL} placeholder="photo url" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <input type="email" defaultValue={user?.email} name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <input name='review' type="text" placeholder="Type here Review" className="input input-bordered w-full" required />
        </div>
        <div className="form-control">
          <input name='date' type="date" placeholder="Review Date" className="input input-bordered w-full" required />
        </div>
        <button className='btn btn-sm btn-primary mt-2'>Submit</button>
        </form>
        </DialogPanel>
        </div>
        </Dialog>
        </>
    );
};

export default ReviewModal;