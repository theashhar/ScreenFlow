import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}
