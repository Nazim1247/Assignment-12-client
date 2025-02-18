import banner from '../assets/banner.jpg';

const Banner = () => {
    return (
        <div className='relative'>
            <img className='w-full lg:h-[500px] rounded-lg opacity-60 dark:opacity-70' src={banner} alt="" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-lg">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Dream House</h1>
            <p className="mt-2 text-lg p-6 hidden md:flex lg:w-2/3 mx-auto">Find your perfect home with Dream House – where comfort meets elegance. Let us help you turn your dream into reality!</p>
        </div>
    </div>
        </div>
    );
};

export default Banner;