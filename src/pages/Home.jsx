import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import ReviewCart from "./ReviewCart";


const Home = () => {
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProperties = async () => {
            const { data } = await axiosPublic.get('/property')
            setProperties(data)
        }
        fetchProperties()

        const fetchReviews = async () => {
            const { data } = await axiosPublic.get('/reviews')
            setReviews(data)
        }
        fetchReviews()
    }, [])

    return (
        <div className="w-11/12 mx-auto">
            <div className="">
                <Banner></Banner>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-center my-8">Top Deals for You</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        properties.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                    }
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-center my-8">Latest Users Reviews</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        reviews.map(review => <ReviewCart key={review._id} review={review}></ReviewCart>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;