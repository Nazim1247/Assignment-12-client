import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import useAxiosPublic from "../hooks/useAxiosPublic";

import ReviewCart from "./ReviewCart";
import FeaturedSection from "../components/FeaturedSection";
import OfferSection from "../components/OfferSection";
import AdvertisementSection from "./dashboard/advertiseProperties/AdvertisementSection";
import { Helmet } from "react-helmet";
import { Slide, Zoom } from "react-awesome-reveal";

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => { 
        const fetchReviews = async () => {
            const { data } = await axiosPublic.get('/reviews')
            setReviews(data)
        }
        fetchReviews()
    }, [])

    return (
        <div>
            <Helmet>
                <title>Dream House | Home</title>
            </Helmet>
            <Zoom>
            <div className="w-11/12 mx-auto">
                <Banner></Banner>
            </div>
            </Zoom>
            <Slide duration={2000} delay={100} direction='right'>
            <div className="w-11/12 mx-auto">
                <AdvertisementSection></AdvertisementSection>
            </div>
            </Slide>
            
            <Slide duration={2000} delay={100}>
            <div className="w-11/12 mx-auto">
                <h2 className="text-2xl font-bold text-center my-8 text-green-600">Latest User's Reviews</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        reviews.map(review => <ReviewCart key={review._id} review={review}></ReviewCart>)
                    }
                </div>
            </div>
            </Slide>
            <Slide duration={2000} delay={100} direction='right'>
            <div>
                <FeaturedSection></FeaturedSection>
            </div>
            </Slide>
            <Slide duration={2000} delay={100}>
            <div>
                <OfferSection></OfferSection>
            </div>
            </Slide>
        </div>
    );
};

export default Home;