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
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Select a screen to record:</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`bg-secondary p-2.5 rounded-lg cursor-pointer transition-all duration-200 border border-border hover:bg-accent ${
              selectedSource === source.id
                ? 'bg-primary text-primary-foreground shadow-[0_0_0_2px_hsl(var(--ring))]'
                : ''
            }`}
            onClick={() => onSourceSelect(source.id)}
          >
            <img src={source.thumbnail.toDataURL()} alt={source.name} className="w-full rounded" />
            <p className="text-foreground font-medium mt-2">{source.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
