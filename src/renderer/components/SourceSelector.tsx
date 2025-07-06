import React from 'react';
import { ScreenSource } from '../types';

interface SourceSelectorProps {
  sources: ScreenSource[];
  selectedSource: string;
  onSourceSelect: (sourceId: string) => void;
}

export const SourceSelector: React.FC<SourceSelectorProps> = ({
  sources,
  selectedSource,
  onSourceSelect,
}) => {
  return (
    <div className="source-selector">
      <h2>Select a screen to record:</h2>
      <div className="sources-grid">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`source-item ${selectedSource === source.id ? 'selected' : ''}`}
            onClick={() => onSourceSelect(source.id)}
          >
            <img src={source.thumbnail.toDataURL()} alt={source.name} />
            <p>{source.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
