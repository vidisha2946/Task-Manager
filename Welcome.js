import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi'; // Info icon
import { AiOutlineClose } from 'react-icons/ai'; // Close icon
import bgImage from './bg.png';
import bgImage1 from './profile.jpg';  // Replace with your background image path

const Welcome = () => {
  const [showCard, setShowCard] = useState(false);

  // Function to toggle card visibility
  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }} // Set the background image
    >
      <h2 className="text-center text-5xl font-extrabold text-fuchsia-900 mb-64 animate-bounce">
        Welcome to 
      </h2>
      <p className="text-center text-xl font-serif text-blue-900 mb-3">
        Organize your tasks efficiently and boost your productivity!
      </p>
      <Link
        to="/todo"
        className="bg-fuchsia-800 text-white p-4 font-serif rounded-full shadow-lg hover:bg-fuchsia-900 transition duration-300 transform hover:scale-105"
      >
        Go to Task Manager
      </Link>

      {/* Info Icon in the top-right corner */}
      <div className="absolute top-4 right-4">
        <FiInfo 
          size={50} 
          className="text-fuchsia-800 cursor-pointer hover:text-fuchsia-900 transition" 
          onClick={toggleCard} 
        />
      </div>

      {/* Info Card */}
      {showCard && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative text-violet-900 p-10 shadow-2xl rounded-xl w-96 transform transition-transform duration-500 ease-out scale-105 hover:scale-110 hover:shadow-xl text-center" 
          style={{ 
            backgroundImage: `url(${bgImage1})`, 
            backgroundSize: 'cover', // Ensures the image covers the entire div
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat' // Prevents the image from repeating
          }}>
            {/* Close Button */}

            <button 
              className="absolute top-2 right-2 text-violet-900 hover:text-gray-500 transition" 
              onClick={toggleCard}
            >
              <AiOutlineClose size={24} />
            </button>

            <h3 className="text-3xl font-bold mb-4 border-b-2 pb-3 border-violet-900">Created By:</h3>
            <p className="mb-2 font-extrabold text-lg">VIDISHA BHAGIYA</p>
            Pursuing Computer Science & Engineering <br></br>
            <span className="mb-2 font-bold"><a href="https://darshan.ac.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500">@Darshan/University</a></span>
            <p className="mb-2">
              Github: <span className="font-bold"><a href="https://github.com/vidisha2946" target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500">Github.com/in/vidisha2946</a></span>
            </p>
            <p>
              LinkedIn: <span className="font-bold"><a href="https://www.linkedin.com/in/vidisha-bhagiya-6144522a5/" target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500">linkedin.com/in/vidisha</a></span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
