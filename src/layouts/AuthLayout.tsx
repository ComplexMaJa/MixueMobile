import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col px-6 py-12 overflow-y-auto">
      <div className="flex items-center mb-10">
        <div className="w-10 h-10 bg-mixue-red rounded-full flex items-center justify-center mr-3">
          <span className="text-white text-lg">⛄</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-mixue-red leading-none">MIXUE</h1>
          <span className="text-[8px] font-medium text-mixue-red tracking-wider">SINCE 1997 • ICE CREAM&TEA</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
