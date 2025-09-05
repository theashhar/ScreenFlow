import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Quick Record</h3>
          <p className="text-muted-foreground mb-4">Start recording your screen immediately</p>
          <Button asChild className="w-full">
            <Link to="/app/record">
              Start Recording
            </Link>
          </Button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Recent Recordings</h3>
          <p className="text-muted-foreground">Your recent recordings will appear here</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Settings</h3>
          <p className="text-muted-foreground mb-4">Configure your recording preferences</p>
          <Button variant="outline" className="w-full">
            Open Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
