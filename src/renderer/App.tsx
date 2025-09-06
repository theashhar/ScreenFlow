import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './components/theme-provider';
import ToastMessages from './components/toastMessages';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="screenloom-theme">
      <AuthProvider>
        <Router>
          <AppRouter />
          <ToastMessages />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
