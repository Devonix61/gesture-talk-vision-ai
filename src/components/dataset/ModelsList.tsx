
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, X, FileVideo } from 'lucide-react';
import { TrainedModel } from '@/context/DatasetContext';

type ModelsListProps = {
  models: TrainedModel[];
  onExportModel: (modelId: string) => void;
  onDeleteModel: (modelId: string) => void;
  onActivateModel: (modelId: string) => void;
};

const ModelsList = ({ models, onExportModel, onDeleteModel, onActivateModel }: ModelsListProps) => {
  if (models.length === 0) {
    return (
      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 p-6 flex flex-col items-center justify-center h-64">
        <FileVideo className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No custom models trained yet</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
        >
          Train Your First Model
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {models.map(model => (
        <div key={model.id} className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 overflow-hidden">
          <div className="bg-primary/10 p-3 border-b border-primary/20 flex justify-between items-center">
            <div className="font-medium">{model.name}</div>
            {model.isActive ? (
              <Badge className="bg-green-500">Active</Badge>
            ) : (
              <Badge variant="outline" className="cursor-pointer" onClick={() => onActivateModel(model.id)}>
                Activate
              </Badge>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Created</span>
              <span>{new Date(model.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Gestures</span>
              <span>{model.gestures.length}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Accuracy</span>
              <span>{model.accuracy}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Size</span>
              <span>{model.size} MB</span>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onExportModel(model.id)}
              >
                <Save className="mr-1.5 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full"
                onClick={() => onDeleteModel(model.id)}
              >
                <X className="mr-1.5 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          
          {model.isActive && (
            <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 p-3 mt-3">
              <h5 className="font-medium mb-2">Included Gestures</h5>
              <div className="flex flex-wrap gap-2">
                {model.gestures.map(gesture => (
                  <Badge key={gesture} variant="outline" className="bg-white/50">
                    {gesture}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModelsList;
