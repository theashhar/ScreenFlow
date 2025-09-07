import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { Focus, FolderOpen } from 'lucide-react';

export default function Dashboard() {
  const handleOpenRecordingsFolder = () => {
    window.electron.ipcRenderer.sendMessage('open-recordings-folder');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Quick Record</h3>
          <p className="text-muted-foreground mb-4">Start recording your screen immediately</p>
          <Link to="/app/record">
            <Button icon={<Focus />}  className="w-full">
                Start Recording
            </Button>
          </Link>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Recent Recordings</h3>
          <p className="text-muted-foreground mb-4">Your recent recordings will appear here</p>
          <Button variant="outline" icon={<FolderOpen />} className="w-full" onClick={handleOpenRecordingsFolder}>
            Open Folder
          </Button>
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
