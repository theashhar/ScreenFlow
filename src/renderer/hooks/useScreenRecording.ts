import { useState, useEffect, useRef, useCallback } from 'react';
import { ScreenSource, RecordingState, MediaConstraints, AlternativeMediaConstraints, UseScreenRecordingReturn } from '../types';

export const useScreenRecording = (): UseScreenRecordingReturn => {
  const [sources, setSources] = useState<ScreenSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    recordingTime: 0,
    recordingComplete: false,
    savedFilePath: '',
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  // Start preview stream
  const startPreview = useCallback(async (sourceId: string) => {
    try {
      // Stop any existing preview stream
      if (previewStream) {
        previewStream.getTracks().forEach(track => track.stop());
        setPreviewStream(null);
      }

      const constraints: MediaConstraints = {
        audio: undefined, // No audio for preview
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId
          }
        }
      };

      console.log('Starting preview with constraints:', constraints);

      // @ts-ignore - Electron types aren't properly recognized
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      console.log('Preview stream obtained:', stream);
      setPreviewStream(stream);

      return stream;
    } catch (error) {
      console.error('Error starting preview:', error);
      // Try alternative constraints for older Electron versions
      try {
        const alternativeConstraints: AlternativeMediaConstraints = {
          video: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId
          }
        };

        // @ts-ignore
        const stream = await navigator.mediaDevices.getUserMedia(alternativeConstraints);
        setPreviewStream(stream);
        return stream;
      } catch (altError) {
        console.error('Alternative preview method also failed:', altError);
        return null;
      }
    }
  }, [previewStream]);

  // Handle source selection
  const handleSourceSelect = useCallback((sourceId: string) => {
    setSelectedSource(sourceId);
    startPreview(sourceId);
  }, [startPreview]);

  // Start recording
  const startRecording = useCallback(async () => {
    if (!selectedSource) return;

    try {
      const constraints: MediaConstraints = {
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

      const options = { mimeType: 'video/webm; codecs=vp9' };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      setRecordingState({
        isRecording: true,
        recordingTime: 0,
        recordingComplete: false,
        savedFilePath: '',
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.onstop = () => {
        // When recording stops, go back to preview-only stream
        if (selectedSource) {
          startPreview(selectedSource);
        }
      };

      mediaRecorder.start(100);
      return stream;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [selectedSource, startPreview]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      setRecordingState(prev => ({ ...prev, isRecording: false }));

      // Handle the recorded data after a short delay to ensure all chunks are collected
      setTimeout(async () => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const buffer = await blob.arrayBuffer();
          window.electron.ipcRenderer.sendMessage('recording-data', buffer);
          setRecordedChunks([]); // Clear chunks after processing
        }
      }, 500);
    }
  }, [recordingState.isRecording, recordedChunks]);

  // Format the recording time
  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

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
  }, []);

  // Handle IPC events
  useEffect(() => {
    // Listen for events from main process
    const recordingCompleteListener = window.electron.ipcRenderer.on(
      'recording-complete',
      (filePath) => {
        setRecordingState(prev => ({
          ...prev,
          recordingComplete: true,
          savedFilePath: filePath as string
        }));
      }
    );

    // Listen for menu start recording command
    const menuStartListener = window.electron.ipcRenderer.on(
      'menu-start-recording',
      () => {
        if (selectedSource && !recordingState.isRecording) {
          startRecording();
        }
      }
    );

    // Listen for menu stop recording command
    const menuStopListener = window.electron.ipcRenderer.on(
      'menu-stop-recording',
      () => {
        if (recordingState.isRecording) {
          stopRecording();
        }
      }
    );

    return () => {
      if (recordingCompleteListener) recordingCompleteListener();
      if (menuStartListener) menuStartListener();
      if (menuStopListener) menuStopListener();
    };
  }, [selectedSource, recordingState.isRecording, startRecording, stopRecording]);

  // Update timer when recording
  useEffect(() => {
    if (recordingState.isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingState(prev => ({ ...prev, recordingTime: prev.recordingTime + 1 }));
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
  }, [recordingState.isRecording]);

  // Clean up streams when component unmounts or source changes
  useEffect(() => {
    return () => {
      if (previewStream) {
        previewStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [previewStream]);

  return {
    sources,
    selectedSource,
    recordingState,
    previewStream,
    recordedChunks,
    handleSourceSelect,
    startRecording,
    stopRecording,
    formatTime,
  };
};
