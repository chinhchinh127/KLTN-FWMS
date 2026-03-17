import React from 'react';
import { Outlet } from 'react-router-dom';
import KitchenSidebar from './KitchenSidebar';

const KitchenLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <KitchenSidebar />
      <div className="flex-1 ml-64 overflow-hidden">
        <main className="h-full overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default KitchenLayout;