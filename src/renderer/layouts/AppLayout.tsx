import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from '../components/AppSidebar';
import { AppHeader } from '../components/AppHeader';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col w-full min-h-screen">
          <AppHeader />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
