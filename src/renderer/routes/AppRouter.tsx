import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import UnauthLayout from '../layouts/UnauthLayout';
import AppLayout from '../layouts/AppLayout';
import { LoginPage, OnboardingRouter } from '../states/unauth';
import { Dashboard, ScreenRecorder } from '../states/auth';

const AppRouter: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<UnauthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding/*" element={<OnboardingRouter />} />
    </Route>

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/record" element={<ScreenRecorder />} />
      </Route>
    </Route>

    {/* Default redirect */}
    <Route path="/" element={<Navigate to="/app" replace />} />
    <Route path="*" element={<Navigate to="/app" replace />} />
  </Routes>
);

export default AppRouter;
