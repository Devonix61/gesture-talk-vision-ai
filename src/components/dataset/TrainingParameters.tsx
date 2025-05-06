
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  HardDrive, 
  Save, 
  BarChart4, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TrainingParametersProps = {
  totalGestures: number;
  totalSamples: number;
  onClearDataset: () => void;
  onExportDataset: () => void;
  onImportDatasetClick: () => void;
  onVisualizationClick: () => void;
};

const TrainingParameters = ({
  totalGestures,
  totalSamples,
  onClearDataset,
  onExportDataset,
  onImportDatasetClick,
  onVisualizationClick
}: TrainingParametersProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h4 className="font-medium">Training Data Summary</h4>
        <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg p-4 border border-white/20 dark:border-gray-800/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Gestures</p>
              <p className="text-2xl font-bold">{totalGestures}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Samples</p>
              <p className="text-2xl font-bold">{totalSamples}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Training Parameters</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm text-muted-foreground">Epochs</Label>
            <Input type="number" defaultValue="50" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Learning Rate</Label>
            <Input type="number" defaultValue="0.001" step="0.001" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Batch Size</Label>
            <Input type="number" defaultValue="32" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Validation Split</Label>
            <Input type="number" defaultValue="0.2" step="0.1" max="0.5" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Advanced Options</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center py-4"
            onClick={onImportDatasetClick}
          >
            <HardDrive className="mr-1.5 h-4 w-4" />
            Import Dataset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center py-4"
            onClick={onExportDataset}
          >
            <Save className="mr-1.5 h-4 w-4" />
            Export Dataset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center py-4"
            onClick={onVisualizationClick}
          >
            <BarChart4 className="mr-1.5 h-4 w-4" />
            Data Visualization
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center py-4 text-destructive hover:text-destructive"
            onClick={onClearDataset}
          >
            <X className="mr-1.5 h-4 w-4" />
            Clear Dataset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingParameters;
