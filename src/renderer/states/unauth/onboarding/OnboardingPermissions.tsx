import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnboardingPermissions() {
  const [permissions, setPermissions] = useState({
    screenRecording: false,
    microphone: false,
    camera: false
  });

  const handlePermissionToggle = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const allPermissionsGranted = Object.values(permissions).every(Boolean);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Permissions Setup</h2>
        <p className="text-gray-600">Grant permissions to enable screen recording features</p>
      </div>

      {/* Permissions List */}
      <div className="space-y-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Screen Recording</h3>
                <p className="text-sm text-gray-600">Capture your screen for recordings</p>
              </div>
            </div>
            <button
              onClick={() => handlePermissionToggle('screenRecording')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                permissions.screenRecording
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {permissions.screenRecording ? 'Granted' : 'Grant'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Microphone</h3>
                <p className="text-sm text-gray-600">Record audio with your videos</p>
              </div>
            </div>
            <button
              onClick={() => handlePermissionToggle('microphone')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                permissions.microphone
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {permissions.microphone ? 'Granted' : 'Grant'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Camera</h3>
                <p className="text-sm text-gray-600">Include webcam in recordings</p>
              </div>
            </div>
            <button
              onClick={() => handlePermissionToggle('camera')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                permissions.camera
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {permissions.camera ? 'Granted' : 'Grant'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link
          to="/onboarding"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Previous step
        </Link>

        <Link
          to="/onboarding/preferences"
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            allPermissionsGranted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
