import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Quick Record</h3>
          <p className="text-gray-600 mb-4">Start recording your screen immediately</p>
          <Link
            to="/app/record"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Recording
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Recent Recordings</h3>
          <p className="text-gray-600">Your recent recordings will appear here</p>
        </div>
      </div>
    </div>
  );
}
