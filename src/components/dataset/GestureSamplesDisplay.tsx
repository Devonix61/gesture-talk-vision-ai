
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GestureSample } from '@/context/DatasetContext';
import { Fingerprint, Info, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

type GestureSamplesDisplayProps = {
  samples: Record<string, GestureSample>;
  onSelectGesture?: (gestureName: string) => void;
};

const GestureSamplesDisplay = ({ samples, onSelectGesture }: GestureSamplesDisplayProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const samplesList = Object.values(samples);
  
  const filteredSamples = searchQuery 
    ? samplesList.filter(sample => 
        sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sample.description && sample.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : samplesList;
  
  if (samplesList.length === 0) {
    return (
      <div className="text-center py-6 bg-white/30 dark:bg-gray-900/30 rounded-lg border border-dashed border-muted">
        <Fingerprint className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
        <p className="text-sm text-muted-foreground italic">No data collected yet</p>
        <p className="text-xs text-muted-foreground mt-1">Start recording gestures to build your dataset</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {samplesList.length > 6 && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gestures..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      
      {filteredSamples.length === 0 && (
        <div className="text-center py-4 bg-white/30 dark:bg-gray-900/30 rounded-lg">
          <p className="text-sm text-muted-foreground">No gestures match your search</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[500px] overflow-y-auto pr-1">
        {filteredSamples.map((sample) => (
          <TooltipProvider key={sample.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-white/50 dark:bg-gray-900/30 rounded-lg p-3 border border-white/20 dark:border-gray-800/20 text-sm flex justify-between items-center cursor-pointer hover:bg-white/70 dark:hover:bg-gray-900/40 transition-colors"
                  onClick={() => onSelectGesture?.(sample.name)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{sample.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(sample.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Fingerprint className="h-3 w-3" />
                    {sample.sampleCount}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Info className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <p className="font-medium">{sample.name}</p>
                  </div>
                  {sample.description && (
                    <p className="text-xs">{sample.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-x-4 text-xs">
                    <div>Created:</div>
                    <div>{new Date(sample.createdAt).toLocaleDateString()}</div>
                    <div>Updated:</div>
                    <div>{new Date(sample.updatedAt).toLocaleDateString()}</div>
                    <div>Samples:</div>
                    <div>{sample.sampleCount}</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default GestureSamplesDisplay;
