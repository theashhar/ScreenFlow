import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function ScreenRecorder() {
  const [sources, setSources] = useState<{ id: string; name: string; thumbnail: { toDataURL: () => string } }[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [savedFilePath, setSavedFilePath] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  // Handle source selection
  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
  };

  // Start recording
  const startRecording = useCallback(async () => {
    if (!selectedSource) return;

    try {
      const constraints = {
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop'
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectedSource
          }
        }
      };

      // @ts-ignore - Electron types aren't properly recognized
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Display preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Set video to maintain aspect ratio
        videoRef.current.style.width = '100%';
        videoRef.current.style.height = 'auto';
      }

      const options = { mimeType: 'video/webm; codecs=vp9' };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      setRecording(true);
      setRecordingTime(0);
      setRecordingComplete(false);
      setSavedFilePath('');

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.start(100);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [selectedSource]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Handle the recorded data after a short delay to ensure all chunks are collected
      setTimeout(() => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });

          // Save the file via IPC
          blob.arrayBuffer().then((buffer) => {
            window.electron.ipcRenderer.sendMessage('recording-data', buffer);
          });
        }
      }, 500);
    }
  }, [recording, recordedChunks]);

  // Get available sources (screens and windows)
  useEffect(() => {
    const getSources = async () => {
      try {
        const result = await window.electron.ipcRenderer.invoke('get-sources');
        setSources(result);
      } catch (error) {
        console.error('Failed to get sources:', error);
      }
    };

    getSources();

    // Listen for events from main process
    const recordingCompleteListener = window.electron.ipcRenderer.on(
      'recording-complete',
      (filePath) => {
        setRecordingComplete(true);
        setSavedFilePath(filePath as string);
      }
    );

    // Listen for menu start recording command
    const menuStartListener = window.electron.ipcRenderer.on(
      'menu-start-recording',
      () => {
        if (selectedSource && !recording) {
          startRecording();
        }
      }
    );

    // Listen for menu stop recording command
    const menuStopListener = window.electron.ipcRenderer.on(
      'menu-stop-recording',
      () => {
        if (recording) {
          stopRecording();
        }
      }
    );

    return () => {
      if (recordingCompleteListener) recordingCompleteListener();
      if (menuStartListener) menuStartListener();
      if (menuStopListener) menuStopListener();
    };
  }, [selectedSource, recording, startRecording, stopRecording]);

  // Update timer when recording
  useEffect(() => {
    if (recording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recording]);

  // Format the recording time
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="screen-recorder">
      <h1>ScreenFlow Recorder</h1>

      <div className="source-selector">
        <h2>Select a screen to record:</h2>
        <div className="sources-grid">
          {sources.map((source) => (
            <div
              key={source.id}
              className={`source-item ${selectedSource === source.id ? 'selected' : ''}`}
              onClick={() => handleSourceSelect(source.id)}
            >
              <img src={source.thumbnail.toDataURL()} alt={source.name} />
              <p>{source.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="record-controls">
        {!recording ? (
          <button
            className="record-button"
            disabled={!selectedSource || recordingComplete}
            onClick={startRecording}
          >
            Start Recording
          </button>
        ) : (
          <>
            <div className="recording-indicator">
              <div className="recording-dot" />
              <span>Recording: {formatTime(recordingTime)}</span>
            </div>
            <button className="stop-button" onClick={stopRecording}>
              Stop Recording
            </button>
          </>
        )}
      </div>

      {selectedSource && (
        <div className="preview">
          <h3>Preview:</h3>
          <video ref={videoRef} muted />
        </div>
      )}

      {recordingComplete && (
        <div className="recording-saved">
          <h3>Recording saved!</h3>
          <p>File saved to: {savedFilePath}</p>
        </div>
      )}
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
