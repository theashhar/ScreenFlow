import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useScreenRecording } from './hooks/useScreenRecording';
import {
  SourceSelector,
  RecordingControls,
  VideoPreview,
  RecordingStatus
} from './components';

function ScreenRecorder() {
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
      <h1>ScreenFlow Recorder</h1>

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
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenRecorder />} />
      </Routes>
    </Router>
  );
}
