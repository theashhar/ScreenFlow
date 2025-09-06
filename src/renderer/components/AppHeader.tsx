import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { AppHeaderProps } from './sidebar';

export function AppHeader({
  title = "ScreenLoom",
  showSidebarTrigger = true,
  actions
}: AppHeaderProps) {
  return (
    <header className="border-b border-border bg-sidebar px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {showSidebarTrigger && <SidebarTrigger />}
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </header>
  );
}
