import React from 'react';
import { Outlet } from 'react-router-dom';

export default function UnauthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ScreenFlow</h1>
          <p className="text-gray-600">Screen Recording Made Simple</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
