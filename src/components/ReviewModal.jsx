import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ReviewModal = ({ isOpen, closeModal, property }) => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal();
        const rev = e.target.review.value;
        const date = e.target.date.value;
        
        const reviewInfo = {
            rev,
            date,
            property
        }
        await axiosSecure.post('/reviews', reviewInfo)
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
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Add a Review</DialogTitle>
                        <Description>Review Form</Description>

                        <form onSubmit={handleSubmit}>
                            <input name='review' type="text" placeholder="Type here Review" className="input input-bordered w-full" required />
                            <input name='date' type="date" placeholder="Review Date" className="input input-bordered w-full mt-2" required />
                            <button className='btn btn-sm btn-primary mt-2'>Submit</button>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default ReviewModal;