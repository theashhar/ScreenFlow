import React from 'react';
import { Link } from 'react-router-dom';

export default function OnboardingComplete() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">You're All Set!</h2>
        <p className="text-gray-600">Your ScreenLoom account is ready to use</p>
      </div>

      {/* Success Content */}
      <div className="space-y-6 mb-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup Complete</h3>
          <p className="text-gray-600">All permissions and preferences have been configured successfully.</p>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-medium text-blue-900 mb-4">What you can do now:</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-800">Start recording your screen in 4K quality</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-800">Edit and enhance your recordings</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-800">Share videos with your team</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-blue-800">Access your recordings from anywhere</span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Quick Tips:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Use <kbd className="px-2 py-1 bg-white border rounded text-xs">Ctrl+Shift+R</kbd> to start recording quickly</p>
            <p>• Press <kbd className="px-2 py-1 bg-white border rounded text-xs">Esc</kbd> to stop recording</p>
            <p>• Check the dashboard for recording analytics</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link
          to="/app"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center block"
        >
          Go to Dashboard
        </Link>

        <Link
          to="/app/record"
          className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center block"
        >
          Start Recording Now
        </Link>
      </div>

      {/* Help Link */}
      <div className="text-center mt-6">
        <Link to="/help" className="text-sm text-gray-500 hover:text-gray-700">
          Need help? Check our documentation
        </Link>
      </div>
    </div>
  );
}
