import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ModeToggle } from '../components/mode-toggle';
import { Button } from '../components/ui/button';

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">ScreenFlow</h1>
          <nav className="flex space-x-4">
            <NavLink
              to="/app"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/record"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              Record
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <ModeToggle />
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="text-sm"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
