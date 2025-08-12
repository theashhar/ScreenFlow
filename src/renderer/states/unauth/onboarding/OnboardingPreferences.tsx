import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnboardingPreferences() {
  const [preferences, setPreferences] = useState({
    quality: '1080p',
    frameRate: '30fps',
    audioQuality: 'high',
    autoSave: true
  });

  const handlePreferenceChange = (key: keyof typeof preferences, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recording Preferences</h2>
        <p className="text-gray-600">Configure your default recording settings</p>
      </div>

      {/* Preferences Form */}
      <div className="space-y-6 mb-8">
        {/* Video Quality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Default Video Quality
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['720p', '1080p', '4K'].map((quality) => (
              <button
                key={quality}
                onClick={() => handlePreferenceChange('quality', quality)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.quality === quality
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{quality}</div>
                <div className="text-xs text-gray-500">
                  {quality === '720p' ? 'HD' : quality === '1080p' ? 'Full HD' : 'Ultra HD'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Frame Rate
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['24fps', '30fps', '60fps'].map((fps) => (
              <button
                key={fps}
                onClick={() => handlePreferenceChange('frameRate', fps)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.frameRate === fps
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{fps}</div>
                <div className="text-xs text-gray-500">
                  {fps === '24fps' ? 'Cinematic' : fps === '30fps' ? 'Standard' : 'Smooth'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Quality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Audio Quality
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'standard', label: 'Standard', desc: 'Good for most uses' },
              { value: 'high', label: 'High Quality', desc: 'Best for professional work' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handlePreferenceChange('audioQuality', option.value)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  preferences.audioQuality === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Auto Save */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Auto-save recordings</h3>
            <p className="text-sm text-gray-600">Automatically save recordings to your library</p>
          </div>
          <button
            onClick={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.autoSave ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link
          to="/onboarding/permissions"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Previous step
        </Link>

        <Link
          to="/onboarding/complete"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
