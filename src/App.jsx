import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [prevTab, setPrevTab] = useState('about');
  const [images, setImages] = useState([
    'https://th.bing.com/th/id/OIP._yC174sEBWELImhmt0sS8gHaE2?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.fFF3Uo8Gp2ROms2DO3nbxwHaEK?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.Mg0Lr-gw5Giz5DcXONli6QHaE7?w=736&h=490&rs=1&pid=ImgDetMain',
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleTabClick = (tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const getTabClasses = (tab) => {
    const isActive = activeTab === tab;
    const isPrev = prevTab === tab;

    if (isActive) {
      return 'opacity-100 translate-x-0';
    } else if (isPrev && activeTab !== tab) {
      return 'opacity-0 -translate-x-full';
    } else {
      return 'opacity-0 translate-x-full';
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left half empty */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100"></div>

      {/* Right side widgets */}
      <div className="flex flex-col lg:w-1/2 w-full p-8 space-y-8">
        {/* First Widget - Tabs */}
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg space-y-4">
          <div className="flex flex-wrap justify-around rounded-3xl p-1 bg-neutral-900">
            <button
              className={`px-4 py-2 ${activeTab === 'about' ? 'bg-gray-600' : 'bg-gray-800'}`}
              onClick={() => handleTabClick('about')}
            >
              About Me
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'experience' ? 'bg-gray-600' : 'bg-gray-800'}`}
              onClick={() => handleTabClick('experience')}
            >
              Experiences
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'recommended' ? 'bg-gray-600' : 'bg-gray-800'}`}
              onClick={() => handleTabClick('recommended')}
            >
              Recommended
            </button>
          </div>

          {/* Content Sections with Sliding Effect */}
          <div className="relative h-40 overflow-hidden">
            <div
              className={`absolute inset-0 p-4 bg-gray-900 rounded-lg transition-all duration-500 ease-in-out ${getTabClasses('about')}`}
            >
              {activeTab === 'about' && <p>Hello! I'm Dave, your sales rep from Salesforce...</p>}
            </div>

            <div
              className={`absolute inset-0 p-4 bg-gray-900 rounded-lg transition-all duration-500 ease-in-out ${getTabClasses('experience')}`}
            >
              {activeTab === 'experience' && <p>I have 10 years of experience in...</p>}
            </div>

            <div
              className={`absolute inset-0 p-4 bg-gray-900 rounded-lg transition-all duration-500 ease-in-out ${getTabClasses('recommended')}`}
            >
              {activeTab === 'recommended' && <p>I recommend these products...</p>}
            </div>
          </div>
        </div>

        {/* Second Widget - Gallery */}
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg space-y-4">
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="text-lg font-bold">Gallery</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrevImage}
                className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
              >
                Prev
              </button>
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
                accept="image/*"
              />
              <label
                htmlFor="imageUpload"
                className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
              >
                + Add Image
              </label>
              <button
                onClick={handleNextImage}
                className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

          {/* Display Images in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index}`}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
