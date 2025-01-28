import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
import Swal from "sweetalert2";


const CheckoutForm = ({offer}) => {
// console.log(offer)
    const [transactionId,setTransactionId] = useState('');
    const {user} = useContext(AuthContext);
    const [clientSecret,setClientSecret] = useState('');
    const [error,setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const totalAmount = offer.amount;
    // console.log(totalAmount)

    useEffect(()=>{
        if(totalAmount > 0){
           axiosSecure.post('/create-payment-intent', {price: totalAmount})
        .then(res =>{
            // console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,totalAmount])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            // console.log('payment error', error)
            setError(error.message)
        }else{
            // console.log('payment method', paymentMethod)
            setError('')
        }
        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }else{
            // console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id);
                // save payment in the database 
                const payment ={
                    name: user?.displayName,
                    email: user?.email,
                    agentEmail: offer?.agentEmail,
                    transactionId: paymentIntent.id,
                    price: totalAmount,
                    date: new Date(),
                    offerId: offer._id,
                    title: offer.title,
                    location: offer.location
                    
                }
                const res = await axiosSecure.post('/payments',payment)
                console.log('payment saved',res.data)
                Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Payment successfully!",
                showConfirmButton: false,
                timer: 1500
                });
            }
        }
        // await axiosSecure.patch(`/payments/bought/${offer._id}`)
        // .then(res =>{
        //     console.log(res.data)
        // })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary mt-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your Transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;