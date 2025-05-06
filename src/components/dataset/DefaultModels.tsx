
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DefaultModels = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Default Models</h4>
      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 overflow-hidden">
        <div className="bg-muted p-3 border-b border-muted flex justify-between items-center">
          <div className="font-medium">MediaPipe Hand Gestures</div>
          <Badge variant="outline">Default</Badge>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Source</span>
            <span>Google MediaPipe</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Gestures</span>
            <span>7 built-in</span>
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
            <Button variant="outline" size="sm" className="w-full">
              Use This Model
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
        <h4 className="font-medium mb-2">About Custom Training</h4>
        <p className="text-xs">
          Create specialized models for your specific sign language needs. Our system 
          allows you to train custom recognition models for regional dialects, 
          industry-specific signs, or educational settings.
        </p>
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/30">
          <h5 className="font-medium mb-1">Supported Platforms</h5>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>Chrome and Edge browsers (desktop)</li>
            <li>Android and iOS (via WebView)</li>
            <li>Export for offline use</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DefaultModels;
