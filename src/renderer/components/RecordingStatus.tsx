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
    <div className="recording-saved">
      <h3>Recording saved!</h3>
      <p>File saved to: {recordingState.savedFilePath}</p>
    </div>
  );
};
