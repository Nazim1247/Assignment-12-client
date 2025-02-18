import welcome from '../assets/welcome.png';

const Welcome = () => {
    return (
        <div>
           <img src={welcome} alt="Welcome" className='rounded-lg'/> 
        </div>
    );
};

export default Welcome;