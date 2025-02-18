import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";


const FeaturedSection = () => {
  const featuredProperties = [
    {
      id: 1,
      name: "Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$5,000,000",
      image: "https://th.bing.com/th/id/OIP.4NrQIqzSkL75pGpmEtLAygHaFj?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Modern Apartment",
      location: "New York, NY",
      price: "$2,000,000",
      image: "https://th.bing.com/th/id/R.f8d04c765b226b0dc9f41edaa2b55555?rik=4ARprhP%2fkCTt9A&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      name: "Cozy Cottage",
      location: "Aspen, CO",
      price: "$1,200,000",
      image: "https://th.bing.com/th/id/R.2a1161ce3cce35da19ff2a2141194e1a?rik=0iV8SSSEJgryDg&pid=ImgRaw&r=0",
    },
    {
      id: 4,
      name: "Beachfront Mansion",
      location: "Malibu, CA",
      price: "$8,000,000",
      image: "https://th.bing.com/th/id/R.0aea6d37a54550a48a22a2946459a2b2?rik=gFX9bAV7nP53dQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-k0Zlh2kkaBM%2fT4YtL2fekzI%2fAAAAAAAAA4w%2fynjKnryMMHs%2fs1600%2f20100802_hrwd_5305_cb_0180.225135012_large.jpg&ehk=ZV1tLiMTPMo%2bUCr63bWL7mFoVFCPDZAwoea%2fj7uy8ho%3d&risl=&pid=ImgRaw&r=0",
    },
  ];

  return (
    <section className="py-10 w-11/12 mx-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProperties.map((property) => (
            <div key={property.id} className="shadow rounded-lg overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 md:h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><FaHome />{property.name}</h3>
                <p className="text-gray-600 flex items-center gap-2"><FaLocationDot />{property.location}</p>
                <p className="text-lg font-bold text-green-600">{property.price}</p>
                <Link to='/allProperties'><button className="mt-4 btn btn-sm btn-primary w-full">
                  View All Properties
                </button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
