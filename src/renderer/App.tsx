import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './components/theme-provider';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="screenflow-theme">
      <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
