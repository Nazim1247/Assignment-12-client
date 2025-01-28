import banner from '../assets/banner.jpg';

const Banner = () => {
    return (
        <div className='relative'>
            <img className='w-full lg:h-[500px] rounded-lg opacity-60' src={banner} alt="" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-lg">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Dream House</h1>
            <p className="mt-2 text-lg">Find your perfect home with us</p>
        </div>
    </div>
        </div>
    );
};

export default Banner;