import toast, { Toaster } from 'react-hot-toast';

// Toast utility functions
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string;
      error: string;
    }
  ) => toast.promise(promise, msgs),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
  custom: (message: string) => toast(message),
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
✅ showToast.success() - Success messages
✅ showToast.error() - Error messages
✅ showToast.loading() - Loading states
✅ showToast.promise() - Promise-based toasts
✅ showToast.dismiss() - Dismiss specific toasts
✅ showToast.custom() - Custom messages

showToast.promise(
  fetch('/api/user'),
  {
    loading: 'Saving user...',
    success: 'User saved!',
    error: 'Failed to save user'
  }
);
*/
