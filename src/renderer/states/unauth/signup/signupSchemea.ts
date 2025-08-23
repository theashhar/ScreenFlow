import { z } from 'zod';
import { showToast } from '../../../components/toastMessages';

// Signup schema with validation rules
export const signupSchema = z.object({
  name: z.string().nonempty("First name is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// TypeScript type for the signup form data
export type SignupFormData = z.infer<typeof signupSchema>;

// Validation function that shows toast messages
export const validateSignupForm = (data: SignupFormData): boolean => {
  try {
    signupSchema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Show the first validation error as a toast
      const firstError = error.issues[0];
      showToast.error(firstError.message);
    } else {
      showToast.error("Validation failed. Please check your input.");
    }
    return false;
  }
};

// Individual field validation functions
export const validateField = {
  name: (value: string): boolean => {
    try {
      signupSchema.shape.name.parse(value);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast.error(error.issues[0].message);
      }
      return false;
    }
  },

  email: (value: string): boolean => {
    try {
      signupSchema.shape.email.parse(value);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast.error(error.issues[0].message);
      }
      return false;
    }
  },

  password: (value: string): boolean => {
    try {
      signupSchema.shape.password.parse(value);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast.error(error.issues[0].message);
      }
      return false;
    }
  },

  confirmPassword: (password: string, confirmPassword: string): boolean => {
    try {
      z.object({
        password: signupSchema.shape.password,
        confirmPassword: signupSchema.shape.confirmPassword,
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }).parse({ password, confirmPassword });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast.error(error.issues[0].message);
      }
      return false;
    }
  },
};

// Helper function to get password strength
export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("At least 8 characters");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One uppercase letter");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One lowercase letter");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One number");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One special character");
  }

  let strength: 'weak' | 'medium' | 'strong';
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 4) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return { strength, score, feedback };
};
