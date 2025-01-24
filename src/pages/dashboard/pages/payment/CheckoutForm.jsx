import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";


const CheckoutForm = () => {
    const [transactionId,setTransactionId] = useState('');
    const {user} = useContext(AuthContext);
    const [clientSecret,setClientSecret] = useState('');
    const [offers,setOffers] = useState([]);
    const [error,setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const totalAmount = offers.reduce((total,item)=> total + item.amount, 0);

    useEffect(()=>{
        if(totalAmount > 0){
            axiosSecure.post('/create-payment-intent', {price: totalAmount})
        .then(res =>{
            setClientSecret(res.data.clientSecret)
        })
        }

        fetchAllOffers();
    },[axiosSecure,totalAmount])

    const fetchAllOffers = async ()=>{
        await axiosSecure.get(`/offers`)
        .then(res =>{
            setOffers(res.data);
        })
    }

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
            console.log('payment error', error)
            setError(error.message)
        }else{
            console.log('payment method', paymentMethod)
            setError('')
        }
        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id);
                // save payment in the database 
                const payment ={
                    email: user.email,
                    transactionId: paymentIntent.id,
                    price: totalAmount,
                    date: new Date(),
                    offersId: offers.map(offer => offer._id),
                    propertyId: offers.map(offer => offer.propertyId),
                }
                const res = await axiosSecure.post('/payments',payment)
                console.log('payment saved',res.data)
            }
        }

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