import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Quick Record</h3>
          <p className="text-muted-foreground mb-4">Start recording your screen immediately</p>
          <Button asChild>
            <Link to="/app/record">
              Start Recording
            </Link>
          </Button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Recent Recordings</h3>
          <p className="text-muted-foreground">Your recent recordings will appear here</p>
        </div>
      </div>
    </div>
  );
}
