import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { User, LogOut } from 'lucide-react';
import { sidebarConfig } from './sidebar';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          {sidebarConfig.logo && <img src={sidebarConfig.logo} className="h-6 w-6" alt="ScreenLoom logo" />}
          <span className="font-semibold">{sidebarConfig.title}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarConfig.items.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                  <NavLink to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2 px-2 py-1">
            <User className="h-4 w-4" />
            <span className="text-sm text-muted-foreground truncate">
              {user?.user?.user_metadata?.displayName || user?.user?.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
