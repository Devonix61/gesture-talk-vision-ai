
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Info, Book, Layers3 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DefaultModels = () => {
  const [activeModel, setActiveModel] = useState('mediapipe');

  const handleUseModel = (modelId: string) => {
    setActiveModel(modelId);
    toast.success(`${modelId === 'mediapipe' ? 'MediaPipe Hand Gestures' : 'ISL Regional Signs'} model activated`);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Default Models</h4>
      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 overflow-hidden">
        <div className="bg-muted p-3 border-b border-muted flex justify-between items-center">
          <div className="font-medium">MediaPipe Hand Gestures</div>
          <Badge variant={activeModel === 'mediapipe' ? 'default' : 'outline'}>
            {activeModel === 'mediapipe' ? 'Active' : 'Default'}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Source</span>
            <span>Google MediaPipe</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Gestures</span>
            <span>75+ built-in</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Accuracy</span>
            <span>95%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Size</span>
            <span>2.8 MB</span>
          </div>
          
          <div className="mt-4">
            <Button 
              variant={activeModel === 'mediapipe' ? "default" : "outline"} 
              size="sm" 
              className="w-full"
              onClick={() => handleUseModel('mediapipe')}
              disabled={activeModel === 'mediapipe'}
            >
              {activeModel === 'mediapipe' ? (
                <><Check className="mr-2 h-4 w-4" /> Current Model</>
              ) : 'Use This Model'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 overflow-hidden">
        <div className="bg-muted p-3 border-b border-muted flex justify-between items-center">
          <div className="font-medium">ISL Regional Signs</div>
          <Badge variant={activeModel === 'isl-regional' ? 'default' : 'outline'}>
            {activeModel === 'isl-regional' ? 'Active' : 'Premium'}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Source</span>
            <span>Regional ISL Dataset</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Gestures</span>
            <span>100+ specialized</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Accuracy</span>
            <span>92%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Size</span>
            <span>4.2 MB</span>
          </div>
          
          <div className="mt-4">
            <Button 
              variant={activeModel === 'isl-regional' ? "default" : "outline"} 
              size="sm" 
              className="w-full"
              onClick={() => handleUseModel('isl-regional')}
              disabled={activeModel === 'isl-regional'}
            >
              {activeModel === 'isl-regional' ? (
                <><Check className="mr-2 h-4 w-4" /> Current Model</>
              ) : 'Use This Model'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
        <h4 className="font-medium mb-2 flex items-center">
          <Book className="h-4 w-4 mr-1.5" />
          About Custom Training
        </h4>
        <p className="text-xs">
          Create specialized models for your specific sign language needs. Our system 
          allows you to train custom recognition models for regional dialects, 
          industry-specific signs, or educational settings.
        </p>
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/30">
          <h5 className="font-medium mb-1 flex items-center">
            <Layers3 className="h-3.5 w-3.5 mr-1.5" />
            Supported Platforms
          </h5>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>Chrome and Edge browsers (desktop)</li>
            <li>Android and iOS (via WebView)</li>
            <li>Export for offline use</li>
          </ul>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/30 flex items-center text-xs">
                <Info className="h-3.5 w-3.5 mr-1.5" />
                <span>Learn more about model comparison</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <div className="space-y-2">
                <p className="font-medium">Model Comparison</p>
                <p className="text-xs">
                  MediaPipe is optimized for common gestures with high accuracy across users.
                  Regional ISL models are specialized for Indian Sign Language regional variations.
                  Custom models allow you to recognize specific gestures unique to your needs.
                </p>
                <p className="text-xs font-medium">
                  For best results, combine the default model with your custom training.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DefaultModels;
