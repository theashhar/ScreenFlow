import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ModeToggle } from '../components/mode-toggle';
import { useAuth } from '../auth/AuthContext';
import signupGif from '../../../assets/signupimage.jpg';

export default function UnauthLayout() {
  const { authState } = useAuth();

  // Redirect to app if user is already authenticated
  if (authState === 'authenticated') {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen w-screen flex bg-background relative">
      {/* Left Panel - Constant */}
      <div className="w-2/5 flex items-center justify-center bg-background relative">
      {/* <div className="absolute top-24 right-0 w-1/2 h-1/2 rounded-full blur-3xl  dark:bg-[#414141]"/> */}
        <div className="w-4/5 h-5/6 rounded-xl flex items-center justify-center relative overflow-hidden">
        {/* Background GIF */}
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src={signupGif}
            alt="Signup background"
          />


            <h1 className="text-2xl z-10 text-white font-bold mb-4">ScreenFlow</h1>

        </div>
      </div>

      {/* Right Panel - Dynamic Content */}
      <div className="w-3/5 flex items-center justify-center bg-background p-12">
        <div className="w-full max-w-md">
          <Outlet />
        {/* Theme Toggle in top right */}
        <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
          <ModeToggle />
        </div>
        </div>
      </div>
    </div>
  );
}
