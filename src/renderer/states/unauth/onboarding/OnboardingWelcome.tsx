import React from 'react';
import { Link } from 'react-router-dom';

export default function OnboardingWelcome() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ScreenFlow!</h2>
        <p className="text-gray-600">Let's get you set up in just a few steps</p>
      </div>

      {/* Welcome Content */}
      <div className="space-y-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Created Successfully</h3>
          <p className="text-gray-600">Your ScreenFlow account is ready. Let's configure it for the best experience.</p>
        </div>

        {/* Steps Preview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">What we'll set up:</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">1</div>
              <span className="text-gray-700">Screen recording permissions</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">2</div>
              <span className="text-gray-500">Recording preferences</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">3</div>
              <span className="text-gray-500">Final setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        to="/onboarding/permissions"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center block"
      >
        Get Started
      </Link>

      {/* Skip Option */}
      <div className="text-center mt-4">
        <Link to="/app" className="text-sm text-gray-500 hover:text-gray-700">
          Skip setup for now
        </Link>
      </div>
    </div>
  );
}
