import React from 'react';
import { useScreenRecording } from '../../../../hooks/useScreenRecording';
import {
  SourceSelector,
  RecordingControls,
  VideoPreview,
  RecordingStatus
} from '../../../../components';

export default function ScreenRecorder() {
  const {
    sources,
    selectedSource,
    recordingState,
    previewStream,
    handleSourceSelect,
    startRecording,
    stopRecording,
    formatTime,
  } = useScreenRecording();

  return (
    <div className="w-full bg-card p-5 rounded-lg shadow-lg border border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Screen Recorder</h2>

      <div className="space-y-6">
        <SourceSelector
          sources={sources}
          selectedSource={selectedSource}
          onSourceSelect={handleSourceSelect}
        />

        <RecordingControls
          selectedSource={selectedSource}
          recordingState={recordingState}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          formatTime={formatTime}
        />

        <VideoPreview
          selectedSource={selectedSource}
          previewStream={previewStream}
        />

        <RecordingStatus recordingState={recordingState} />
      </div>
    </div>
  );
}
