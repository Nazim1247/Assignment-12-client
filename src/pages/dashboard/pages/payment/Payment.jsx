import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Zoom } from "react-awesome-reveal";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const offer = useLoaderData();
    // console.log(offer)
    
    return (
        <Zoom>
            <div>
            <Helmet>
                <title>Dream House | Dashboard | Payment</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheckoutForm offer={offer}></CheckoutForm>
            </Elements>
        </div>
        </Zoom>
    );
};

export default Payment;