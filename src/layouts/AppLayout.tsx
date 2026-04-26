import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-mixue-bg flex flex-col pb-16">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
