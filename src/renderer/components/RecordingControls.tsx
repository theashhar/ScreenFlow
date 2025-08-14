import React from 'react';
import { RecordingState } from '../types';
import { Button } from "./ui/button"

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
        <Button
          variant="outline"
          disabled={!selectedSource || recordingState.recordingComplete}
          onClick={onStartRecording}
        >
          Start Recording
        </Button>
      ) : (
        <>
          <div className="recording-indicator">
            <div className="recording-dot" />
            <span className="text-foreground">Recording: {formatTime(recordingState.recordingTime)}</span>
          </div>
          <Button
            variant="destructive"
            onClick={onStopRecording}
          >
            Stop Recording
          </Button>
        </>
      )}
    </div>
  );
};
