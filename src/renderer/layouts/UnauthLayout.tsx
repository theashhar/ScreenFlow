import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ModeToggle } from '../components/mode-toggle';
import { Button } from '../components/ui/button';
import { useAuth } from '../auth/AuthContext';

export default function UnauthLayout() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleBypassLogin = () => {
    // For development/testing purposes - bypass authentication
    login('farzi-token')
    navigate('/app');
  };

  return (
    <div className="min-h-screen w-screen flex bg-background">
      {/* Left Panel - Constant */}
      <div className="w-2/5 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-12 relative">
        <div className="text-primary-foreground max-w-md">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold mb-4">ScreenFlow</h1>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Create your account in a few steps, and get access to professional screen recording and editing tools.
          </p>

          {/* Features List */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
              <span className="text-primary-foreground/80">4K Ultra HD Recording</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
              <span className="text-primary-foreground/80">Professional Editing Tools</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
              <span className="text-primary-foreground/80">Cloud Storage & Sharing</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle and Bypass Login in top right */}
        <div className="absolute top-6 right-6 flex items-center space-x-2">
          <ModeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleBypassLogin}
          >
            Bypass Login
          </Button>
        </div>

      </div>

      {/* Right Panel - Dynamic Content */}
      <div className="w-3/5 flex items-center justify-center p-12 bg-card">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
