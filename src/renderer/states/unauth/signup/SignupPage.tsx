import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { supabase } from '@/renderer/supabase/supabaseClient';
import { SignupFormData } from './signupTypes';
import { AuthResponse } from '@supabase/supabase-js';
import { showToast } from '@/renderer/components';
import {
  validateSignupForm,
  getPasswordStrength,
} from '../ValidationSchema';
import { Checkbox } from '@/renderer/components/ui/checkbox';
import { useAuth } from '@/renderer/auth/AuthContext';

export default function SignupPage() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthResponse['data'] | null>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ReturnType<typeof getPasswordStrength> | null>(null);

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            displayName: formData.name,
          }
        }
      })

      setAuthData(data);

      if (error) {
        console.log('Signup error:', error);
        showToast.error(error.message || 'Signup failed. Please try again.');
        return false;
      }

      console.log('Signup successful:', data);
      showToast.success('Account created successfully!');

      await login(data);
      return true;
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      showToast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm(formData)) {
      return;
    }

    setIsLoading(true);

    try {
      showToast.loading('Creating Account...')
      const success = await handleSignup();
      if (success) {
        navigate('/onboarding');
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

    // Real-time password strength validation
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join ScreenFlow and start recording</p>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Your Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
          />
          {passwordStrength && (
            <div className="mt-2">
              <div className="text-sm">
                Strength: <span className={`font-bold ${
                  passwordStrength.strength === 'weak' ? 'text-red-500' :
                  passwordStrength.strength === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {passwordStrength.strength}
                </span>
              </div>
              {passwordStrength.feedback.length > 0 && (
                <ul className="text-xs text-muted-foreground mt-1">
                  {passwordStrength.feedback.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox checked={formData.agreeToTerms} onCheckedChange={(checked: boolean) => {setFormData(prev => ({...prev, agreeToTerms: checked}))}} />
          <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <Link to="/terms" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formData.agreeToTerms}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-4 text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* Social Signup */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" size="lg">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </Button>
      </div>

      {/* Sign In Link */}
      <div className="text-center mt-8">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
