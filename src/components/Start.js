import React, { useEffect, useState } from 'react';
import cloud from '../Assets/cloud.png';
import clear from '../Assets/clear.png';
import snow from '../Assets/snow.png';

function Start({ onGetStarted }) {
    const [currentImage, setCurrentImage] = useState(cloud);
    const images = [cloud, snow, clear];
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            index = (index + 1) % images.length;
            setCurrentImage(images[index]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center  min-h-screen bg-purple-300">
            <div className='bg-yellow-200 border-solid shadow-xl shadow-amber-700 border-4  border-purple-900 mt-8 rounded-2xl'>
                <div className="weather flex items-center flex-col my-4 rounded-2xl">
                    <img className='sm:mt-4 h-full w-full mt-4 sm:items-center mx-10' src={currentImage} alt="Weather icon" />
                    <h1 className="text-5xl font-bold animate-blink">Weather <br />Forecast</h1>
                    <button 
                        className='border px-12 py-2 mb-12 mt-5 border-cyan-700 bg-yellow-400 rounded-lg hover:bg-blue-600
                        hover:text-white transition-colors duration-500' 
                        onClick={onGetStarted} // Call the function when clicked
                    >
                        Get started
                    </button>
                </div>   
            </div>
        </div>
    );
}

export default Start;
