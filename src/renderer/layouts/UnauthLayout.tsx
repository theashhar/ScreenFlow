import React from 'react';
import { Outlet } from 'react-router-dom';

export default function UnauthLayout() {
  return (
    <div className="min-h-screen w-screen flex bg-gray-50">
      {/* Left Panel - Constant */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-12">
        <div className="text-white max-w-md">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold mb-4">ScreenFlow</h1>

          {/* Description */}
          <p className="text-lg text-blue-100 leading-relaxed">
            Create your account in a few steps, and get access to professional screen recording and editing tools.
          </p>

          {/* Features List */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-blue-100">4K Ultra HD Recording</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-blue-100">Professional Editing Tools</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-blue-100">Cloud Storage & Sharing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Dynamic Content */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
