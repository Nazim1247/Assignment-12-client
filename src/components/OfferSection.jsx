import { Link } from "react-router-dom";


const OfferSection = () => {
  const offers = [
    {
      id: 1,
      title: "10% Off on Luxury Villas",
      location: "Beverly Hills, CA",
      price: "$4,500,000",
      image: "https://th.bing.com/th/id/OIP.36GPvsIiZOf9gGtuaQZGtQHaE8?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      id: 2,
      title: "Holiday Special Offer",
      location: "Malibu, CA",
      price: "$7,200,000",
      image: "https://tse1.mm.bing.net/th?id=OIP.KErLcb2Rr0sZqq4KURjT3AHaFu&pid=ImgDet&w=178&h=137&c=7",
    },
    {
      id: 3,
      title: "Free Consultation for Apartments",
      location: "New York, NY",
      price: "$1,800,000",
      image: "https://th.bing.com/th/id/OIP.H3JLDFq4UAiobZ7ldehP5QHaE8?w=297&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      id: 4,
      title: "Spring Sale on Cottages",
      location: "Aspen, CO",
      price: "$1,000,000",
      image: "https://th.bing.com/th/id/OIP.83GqjVhSJchEAkpRmwnxlAHaEn?w=316&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="shadow rounded-lg overflow-hidden flex flex-col justify-between">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 md:h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{offer.title}</h3>
                <p className="text-gray-600">{offer.location}</p>
                <p className="text-lg font-bold text-green-600">{offer.price}</p>
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

export default OfferSection;
