import React, { useEffect, useRef } from 'react';

interface VideoPreviewProps {
  selectedSource: string;
  previewStream: MediaStream | null;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  selectedSource,
  previewStream,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;

      // Add event listeners for debugging
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded');
      };

      videoRef.current.oncanplay = () => {
        console.log('Video can play');
      };

      videoRef.current.onerror = (e) => {
        console.error('Video error:', e);
      };

      videoRef.current.play().catch(console.error);
    }
  }, [previewStream]);

  if (!selectedSource) {
    return null;
  }

  return (
    <div className="preview">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Preview:</h3>
      <video ref={videoRef} muted autoPlay playsInline />
    </div>
  );
};
