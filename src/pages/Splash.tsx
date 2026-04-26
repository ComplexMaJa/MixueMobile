import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashImg from '../assets/Splash.png';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/onboarding');
      }, 500); // Match this with the transition duration
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`h-full w-full flex items-center justify-center transition-opacity duration-500 bg-white ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <img src={SplashImg} alt="Mixue Splash" className="w-full h-full object-cover" />
    </div>
  );
};
