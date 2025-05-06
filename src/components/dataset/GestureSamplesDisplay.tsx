
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GestureSample } from '@/context/DatasetContext';

type GestureSamplesDisplayProps = {
  samples: Record<string, GestureSample>;
  onSelectGesture?: (gestureName: string) => void;
};

const GestureSamplesDisplay = ({ samples, onSelectGesture }: GestureSamplesDisplayProps) => {
  const samplesList = Object.values(samples);
  
  if (samplesList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">No data collected yet</p>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {samplesList.map((sample) => (
        <div 
          key={sample.id}
          className="bg-white/50 dark:bg-gray-900/30 rounded-lg p-2 border border-white/20 dark:border-gray-800/20 text-sm flex justify-between items-center cursor-pointer hover:bg-white/70 dark:hover:bg-gray-900/40 transition-colors"
          onClick={() => onSelectGesture?.(sample.name)}
        >
          <span className="font-medium truncate">{sample.name}</span>
          <Badge variant="secondary" className="text-xs">
            {sample.sampleCount} samples
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default GestureSamplesDisplay;
