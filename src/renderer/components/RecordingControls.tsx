import React from 'react';
import { RecordingState } from '../types';
import { Button } from "./ui/button"
import { PlayIcon, Video } from 'lucide-react';

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
    <div className="flex justify-center my-5">
      {!recordingState.isRecording ? (
        <Button
          icon={<Video color='red' />}
          variant="outline"
          disabled={!selectedSource || recordingState.recordingComplete}
          onClick={onStartRecording}
          className='hover:text-red-500'
        >
          Start Recording
        </Button>
      ) : (
        <>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-destructive rounded-full mr-2 animate-recording-pulse" />
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
