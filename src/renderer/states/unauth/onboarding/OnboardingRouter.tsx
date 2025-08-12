import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OnboardingWelcome from './OnboardingWelcome';
import OnboardingPermissions from './OnboardingPermissions';
import OnboardingPreferences from './OnboardingPreferences';
import OnboardingComplete from './OnboardingComplete';

export default function OnboardingRouter() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingWelcome />} />
      <Route path="/permissions" element={<OnboardingPermissions />} />
      <Route path="/preferences" element={<OnboardingPreferences />} />
      <Route path="/complete" element={<OnboardingComplete />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
