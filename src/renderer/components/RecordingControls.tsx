import React from 'react';
import { RecordingState } from '../types';

interface RecordingControlsProps {
  selectedSource: string;
  recordingState: RecordingState;
  onStartRecording: () => void;
  onStopRecording: () => void;
  formatTime: (timeInSeconds: number) => string;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  selectedSource,
  recordingState,
  onStartRecording,
  onStopRecording,
  formatTime,
}) => {
  return (
    <div className="record-controls">
      {!recordingState.isRecording ? (
        <button
          className="record-button"
          disabled={!selectedSource || recordingState.recordingComplete}
          onClick={onStartRecording}
        >
          Start Recording
        </button>
      ) : (
        <>
          <div className="recording-indicator">
            <div className="recording-dot" />
            <span>Recording: {formatTime(recordingState.recordingTime)}</span>
          </div>
          <button className="stop-button" onClick={onStopRecording}>
            Stop Recording
          </button>
        </>
      )}
    </div>
  );
};
