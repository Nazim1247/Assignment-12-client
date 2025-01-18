import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center space-y-2 mt-12'>
            <p>Opps!!</p>
            <h2 className='text-5xl'>404</h2>
            <p className='text-red-500'>Not Found Data</p>
            <Link className='btn btn-primary' to='/'> <FaArrowLeft /> Back to Home</Link>
        </div>
    );
};

export default ErrorPage;