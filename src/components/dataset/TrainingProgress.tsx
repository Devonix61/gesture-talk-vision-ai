
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, X, Check } from 'lucide-react';

type TrainingProgressProps = {
  isTraining: boolean;
  progress: number;
  onStartTraining: () => void;
  onStopTraining: () => void;
  canStartTraining: boolean;
};

const TrainingProgress = ({ 
  isTraining, 
  progress, 
  onStartTraining, 
  onStopTraining,
  canStartTraining
}: TrainingProgressProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Training Progress</h4>
            {isTraining && <Badge className="bg-green-500">Training</Badge>}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress}% Complete</span>
            <span>{isTraining ? 'Estimated time: 2:45 remaining' : 'Ready to train'}</span>
          </div>
        </div>
        
        {isTraining ? (
          <div className="space-y-2">
            <div className="bg-white/80 dark:bg-gray-900/50 rounded-lg p-3 border border-white/20 dark:border-gray-800/20 h-32 overflow-y-auto font-mono text-xs">
              <div className="text-green-600 dark:text-green-400">
                [INFO] Initializing model training...<br />
                [INFO] Loading dataset with samples<br />
                [INFO] Preprocessing data...<br />
                [INFO] Training started, epoch 1/50<br />
                [INFO] Epoch 1/50: loss 2.34, accuracy 0.31<br />
                [INFO] Epoch 2/50: loss 1.87, accuracy 0.45<br />
                [INFO] Epoch 3/50: loss 1.56, accuracy 0.58
              </div>
            </div>
            <Button 
              variant="destructive"
              className="w-full"
              onClick={onStopTraining}
            >
              <X className="mr-2 h-5 w-5" />
              Stop Training
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 py-6 text-lg"
            onClick={onStartTraining}
            disabled={!canStartTraining}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Training
          </Button>
        )}
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 border border-muted">
        <h4 className="font-medium mb-3">Training Information</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
            <span>Model will be trained for all collected gestures</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
            <span>Training is performed locally on your device</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
            <span>Estimated training time: 3-5 minutes for this dataset</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
            <span>Once trained, models can be exported and shared</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrainingProgress;
