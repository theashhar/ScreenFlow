import toast, { Toaster } from 'react-hot-toast';

// Toast utility functions
export const showToast = {
  success: (message: string, duration?: number) => toast.success(message, { duration }),
  error: (message: string, duration?: number) => toast.error(message, { duration }),
  loading: (message: string, duration?: number) => toast.loading(message, { duration }),
  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string;
      error: string;
    },
    duration?: number
  ) => toast.promise(promise, msgs, { duration }),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
  custom: (message: string, duration?: number) => toast(message, { duration }),
};

// Toaster component with custom styling
const ToastMessages = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        className: '',
        duration: 4000,
        style: {
          // background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: 'var(--radius)',
          fontSize: '14px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        // Success toasts
        // success: {
        //   iconTheme: {
        //     primary: 'hsl(var(--primary))',
        //     secondary: 'hsl(var(--primary-foreground))',
        //   },
        // },
        // Error toasts

      }}
    />
  );
};

export default ToastMessages;

/*
✅ showToast.success(message, duration?) - Success messages
✅ showToast.error(message, duration?) - Error messages
✅ showToast.loading(message, duration?) - Loading states
✅ showToast.promise(promise, msgs, duration?) - Promise-based toasts
✅ showToast.dismiss(toastId?) - Dismiss specific toasts
✅ showToast.custom(message, duration?) - Custom messages

// Examples:
showToast.loading('Processing...', 5000); // 5 seconds
showToast.success('Saved!', 2000); // 2 seconds
showToast.promise(
  fetch('/api/user'),
  {
    loading: 'Saving user...',
    success: 'User saved!',
    error: 'Failed to save user'
  },
  3000 // 3 seconds duration
);
*/
