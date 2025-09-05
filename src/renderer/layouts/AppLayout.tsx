import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import { AppSidebar } from '../components/AppSidebar';
import { AppHeader } from '../components/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col w-full min-h-screen">
          <AppHeader />
          <main className=" p-4">
            <Outlet />
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
