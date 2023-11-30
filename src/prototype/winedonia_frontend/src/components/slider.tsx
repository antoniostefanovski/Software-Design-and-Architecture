import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'img1_resized.jpg',
    'img2_resized.jpg',
    'img3_resized.jpg',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/images/${images[currentIndex]}`}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
        />
      </div>
    </div>
  );
};

export default Slider;