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
    <div className="screen-recorder">
      <h2 className="text-2xl font-bold mb-6">Screen Recorder</h2>

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
