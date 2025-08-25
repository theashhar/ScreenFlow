import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { supabase } from '@/renderer/supabase/supabaseClient';
import { showToast } from '@/renderer/components';
import { useAuth } from '@/renderer/auth/AuthContext';
import { LoginFormData, validateLoginForm } from '../ValidationSchema';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const signInWithEmail = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.log('Login error:', error);
        showToast.error(error.message || 'Login failed. Please try again.');
        return false;
      }

      console.log('Login successful:', data);

      // Use the AuthContext login method to update auth state
      await login(data);
      return true;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      showToast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm(formData)) {
      return;
    }

    setIsLoading(true);

    try {
      showToast.loading('Signing in...', 1000);
      const success = await signInWithEmail();
      if (success) {
        navigate('/app');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your ScreenFlow account</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-input text-primary focus:ring-ring" />
            <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-4 text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" size="lg">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
