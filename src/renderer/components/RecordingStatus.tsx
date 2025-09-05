import React from 'react';
import { RecordingState } from '../types';

interface RecordingStatusProps {
  recordingState: RecordingState;
}

export const RecordingStatus: React.FC<RecordingStatusProps> = ({
  recordingState,
}) => {
  if (!recordingState.recordingComplete) {
    return null;
  }

  return (
    <div className="mt-5 p-4 bg-accent rounded-lg border border-border">
      <h3 className="text-foreground font-semibold mb-2">Recording saved!</h3>
      <p className="text-muted-foreground break-all bg-muted p-2 rounded">File saved to: {recordingState.savedFilePath}</p>
    </div>
  );
};
