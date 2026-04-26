import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

const slides = [
  {
    title: 'Fresh Ice Cream & Sweet Tea',
    description: 'Enjoy thousands of stores worldwide with you.',
    image: '🍦'
  },
  {
    title: 'Good Quality Low Price',
    description: 'High quality products at affordable prices.',
    image: '🍨'
  },
  {
    title: 'Fast Delivery To You',
    description: 'Real-time order tracking and fast delivery.',
    image: '🛵'
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
    <div className="h-full w-full bg-white flex flex-col relative px-6 py-8">
      <div className="flex justify-between items-center mb-12">
        <Typography variant="h2" className="text-mixue-red">MIXUE</Typography>
        <button onClick={handleSkip} className="text-sm font-medium text-mixue-dark">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-9xl mb-8">{slides[currentSlide].image}</div>
        <Typography variant="h1" className="mb-4 whitespace-pre-line leading-tight">
          {slides[currentSlide].title.replace(' & ', ' &\n')}
        </Typography>
        <Typography variant="body1" className="text-mixue-gray px-4">
          {slides[currentSlide].description}
        </Typography>
      </div>

      <div className="flex flex-col items-center pb-8 mt-8">
        <div className="flex space-x-2 mb-8">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-mixue-red' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>
        
        <Button onClick={handleNext} fullWidth size="lg">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
