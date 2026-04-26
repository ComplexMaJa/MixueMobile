import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col overflow-y-auto hide-scrollbar">
      <Outlet />
    </div>
  );
};
