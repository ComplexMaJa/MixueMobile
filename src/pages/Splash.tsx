import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../components/Typography';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full w-full bg-mixue-red flex flex-col items-center justify-center">
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4">
        {/* Placeholder for Snow King Logo */}
        <span className="text-4xl">⛄</span>
      </div>
      <Typography variant="h1" className="text-white text-3xl mb-1">MIXUE</Typography>
      <Typography variant="caption" className="text-white/80">SINCE 1997 • ICE CREAM&TEA</Typography>
    </div>
  );
};
