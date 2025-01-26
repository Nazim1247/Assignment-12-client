import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const offer = useLoaderData();
    // console.log(offer)
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm offer={offer}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;