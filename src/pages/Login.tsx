import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Typography } from '../components/Typography';
import LogoBig from '../assets/LogoBig.png';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/home');
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-full w-full bg-white flex flex-col relative px-8 py-10">
      {/* Top Logo */}
      <div className="w-full flex justify-center mb-12 mt-6">
        <img src={LogoBig} alt="Mixue Logo" className="h-[180px] object-contain" />
      </div>

      <div className="mb-8">
        <Typography variant="h1" className="mb-2 text-[26px] font-bold text-black">Welcome Back!</Typography>
        <Typography variant="body1" className="text-gray-500 text-[15px]">Login to continue</Typography>
      </div>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col">
        <div className="space-y-4">
          <Input 
            placeholder="Phone Number / Email" 
            leftIcon={<User size={18} strokeWidth={1.5} className="text-gray-400" />}
            className="!rounded-3xl border-gray-200 focus:!border-mixue-red h-14"
            required
          />
          <Input 
            type="password"
            placeholder="Password" 
            leftIcon={<Lock size={18} strokeWidth={1.5} className="text-gray-400" />}
            className="!rounded-3xl border-gray-200 focus:!border-mixue-red h-14"
            required
          />
        </div>
        
        <div className="flex justify-end pt-3 mb-8">
          <button type="button" className="text-[13px] font-medium text-gray-800 hover:text-mixue-red transition-colors">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg" className="rounded-full h-14 text-[16px] font-semibold">
          Login
        </Button>
        
        <div className="relative flex items-center justify-center my-8">
          <div className="absolute border-t border-gray-200 w-full"></div>
          <span className="bg-white px-4 text-xs text-gray-500 relative z-10">or continue with</span>
        </div>
        
        <Button 
          type="button" 
          variant="secondary" 
          fullWidth 
          size="lg" 
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="rounded-full h-14 bg-white border border-gray-200 text-black font-semibold hover:bg-gray-50 flex items-center justify-center"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-mixue-red" />
          ) : (
            <>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </Button>
        
        <div className="mt-auto pt-6 text-center text-[15px] pb-4">
          <span className="text-gray-500">Don't have an account? </span>
          <button type="button" onClick={handleSignUp} className="text-mixue-red font-medium">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
