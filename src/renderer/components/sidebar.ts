import React from 'react';
import {
  Home,
  Video,
  Settings,
  Monitor
} from 'lucide-react';

// Types
export interface SidebarMenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface SidebarConfig {
  items: SidebarMenuItem[];
  title: string;
  logo?: React.ComponentType<{ className?: string }>;
}

export interface AppHeaderProps {
  title?: string;
  showSidebarTrigger?: boolean;
  actions?: React.ReactNode;
}

// Configuration
export const sidebarConfig: SidebarConfig = {
  title: "ScreenFlow",
  logo: Monitor,
  items: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/app",
      icon: Home,
    },
    {
      id: "record",
      label: "Record",
      path: "/app/record",
      icon: Video,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/app/settings",
      icon: Settings,
    },
  ],
};
