export interface ScreenSource {
  id: string;
  name: string;
  thumbnail: {
    toDataURL: () => string;
  };
}

export interface RecordingState {
  isRecording: boolean;
  recordingTime: number;
  recordingComplete: boolean;
  savedFilePath: string;
}

export interface MediaConstraints {
  audio?: {
    mandatory: {
      chromeMediaSource: string;
    };
  };
  video: {
    mandatory: {
      chromeMediaSource: string;
      chromeMediaSourceId: string;
    };
  };
}

export interface AlternativeMediaConstraints {
  video: {
    chromeMediaSource: string;
    chromeMediaSourceId: string;
  };
}

export interface UseScreenRecordingReturn {
  sources: ScreenSource[];
  selectedSource: string;
  recordingState: RecordingState;
  previewStream: MediaStream | null;
  recordedChunks: BlobPart[];
  handleSourceSelect: (sourceId: string) => void;
  startRecording: () => Promise<MediaStream | undefined>;
  stopRecording: () => void;
  formatTime: (timeInSeconds: number) => string;
}
