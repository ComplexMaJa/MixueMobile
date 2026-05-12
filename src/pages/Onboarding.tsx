import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';


import Onboarding1 from '../assets/Onboarding1.png';
import Onboarding2 from '../assets/Onboarding2.png';
import Onboarding3 from '../assets/Onboarding3.png';

const slides = [
  {
    title: 'Fresh Ice Cream &\nSweet Tea',
    description: 'Enjoy thousands of stores\nworldwide with you.',
    image: Onboarding1
  },
  {
    title: 'Good Quality\nLow Price',
    description: 'High quality products\nat affordable prices.',
    image: Onboarding2
  },
  {
    title: 'Fast Delivery\nTo You',
    description: 'Real-time order tracking\nand fast delivery.',
    image: Onboarding3
  }
];

export const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth/login');
    }
  };

  const handleSkip = () => {
    navigate('/auth/login');
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative px-6 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6 h-12">
        <div className="w-40 h-full flex items-center">
          <img src="https://images.seeklogo.com/logo-png/61/2/mixue-logo-png_seeklogo-616346.png" alt="Mixue" className="w-full h-full object-contain object-left scale-[2] origin-left" />
        </div>
        <button onClick={handleSkip} className="text-sm font-medium text-gray-600">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center pb-4">
        <div className="w-full max-w-[340px] h-[380px] mb-8 flex items-end justify-center">
          <img src={slides[currentSlide].image} alt="Onboarding" className="max-w-full max-h-full object-contain" />
        </div>
        <Typography variant="h1" className="mb-4 whitespace-pre-line leading-tight text-2xl">
          {slides[currentSlide].title}
        </Typography>
        <Typography variant="body1" className="text-gray-500 px-4 whitespace-pre-line text-[15px] leading-relaxed">
          {slides[currentSlide].description}
        </Typography>
      </div>

      <div className="flex flex-col items-center pb-4 mt-auto">
        <div className="flex space-x-3 mb-8">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentSlide ? 'bg-mixue-red' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <Button onClick={handleNext} fullWidth size="lg" className="rounded-2xl text-[17px] font-semibold py-4">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
