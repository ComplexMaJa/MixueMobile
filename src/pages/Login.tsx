import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Typography } from '../components/Typography';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/home');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-8">
        <Typography variant="h1" className="mb-2">Welcome Back!</Typography>
        <Typography variant="body1" className="text-mixue-gray">Login to continue</Typography>
      </div>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col space-y-4">
        <Input 
          placeholder="Phone Number / Email" 
          leftIcon={<User size={20} />}
          required
        />
        <Input 
          type="password"
          placeholder="Password" 
          leftIcon={<Lock size={20} />}
          required
        />
        
        <div className="flex justify-end pt-2">
          <button type="button" className="text-xs font-medium text-mixue-gray hover:text-mixue-dark">
            Forgot Password?
          </button>
        </div>

        <div className="pt-6">
          <Button type="submit" fullWidth size="lg" className="mb-6">
            Login
          </Button>
          
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-mixue-gray relative z-10">or continue with</span>
          </div>
          
          <Button type="button" variant="secondary" fullWidth size="lg" className="mb-8">
            <span className="flex items-center">
              <span className="mr-2 text-lg">G</span> Continue with Google
            </span>
          </Button>
        </div>
        
        <div className="mt-auto text-center text-sm">
          <span className="text-mixue-gray">Don't have an account? </span>
          <button type="button" className="text-mixue-red font-semibold">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
