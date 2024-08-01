import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-semibold mb-4">Welcome to 23andMe</h1>
                <p className="mb-4">Explore your ancestry and health insights</p>
                
            </div>
        </div>
    );
};

export default HomePage;
