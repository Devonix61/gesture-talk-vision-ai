
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

export type GestureSample = {
  id: string;
  name: string;
  description?: string;
  sampleCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TrainedModel = {
  id: string;
  name: string;
  gestures: string[];
  accuracy: number;
  createdAt: Date;
  size: number;
  isActive: boolean;
};

type DatasetContextType = {
  gestureSamples: Record<string, GestureSample>;
  addGestureSample: (name: string, description?: string, count?: number) => void;
  updateGestureSample: (name: string, count: number) => void;
  clearGestureSamples: () => void;
  trainedModels: TrainedModel[];
  trainingProgress: number;
  isTraining: boolean;
  startTraining: () => void;
  stopTraining: () => void;
  exportDataset: () => void;
  importDataset: (dataset: Record<string, GestureSample>) => void;
  setActiveModel: (modelId: string) => void;
  deleteModel: (modelId: string) => void;
};

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider = ({ children }: { children: ReactNode }) => {
  const [gestureSamples, setGestureSamples] = useState<Record<string, GestureSample>>({});
  const [trainedModels, setTrainedModels] = useState<TrainedModel[]>([]);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedSamples = localStorage.getItem('isl-gesture-samples');
      const savedModels = localStorage.getItem('isl-trained-models');
      
      if (savedSamples) {
        setGestureSamples(JSON.parse(savedSamples));
      }
      
      if (savedModels) {
        setTrainedModels(JSON.parse(savedModels));
      }
    } catch (error) {
      console.error("Error loading saved dataset:", error);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('isl-gesture-samples', JSON.stringify(gestureSamples));
    } catch (error) {
      console.error("Error saving gesture samples:", error);
    }
  }, [gestureSamples]);

  useEffect(() => {
    try {
      localStorage.setItem('isl-trained-models', JSON.stringify(trainedModels));
    } catch (error) {
      console.error("Error saving trained models:", error);
    }
  }, [trainedModels]);

  const addGestureSample = (name: string, description?: string, count = 10) => {
    if (!name.trim()) {
      toast.error("Please enter a valid gesture name");
      return;
    }

    setGestureSamples(prev => ({
      ...prev,
      [name]: {
        id: crypto.randomUUID(),
        name,
        description: description || '',
        sampleCount: prev[name]?.sampleCount ? prev[name].sampleCount + count : count,
        createdAt: prev[name]?.createdAt ? prev[name].createdAt : new Date(),
        updatedAt: new Date()
      }
    }));
    
    toast.success(`Added ${count} samples for "${name}"`);
  };

  const updateGestureSample = (name: string, count: number) => {
    setGestureSamples(prev => {
      if (!prev[name]) {
        return prev;
      }
      
      return {
        ...prev,
        [name]: {
          ...prev[name],
          sampleCount: prev[name].sampleCount + count,
          updatedAt: new Date()
        }
      };
    });
  };

  const clearGestureSamples = () => {
    setGestureSamples({});
    toast.info("Dataset cleared");
  };

  const startTraining = () => {
    const totalGestures = Object.keys(gestureSamples).length;
    
    if (totalGestures === 0) {
      toast.error("You need to collect samples for at least one gesture");
      return;
    }
    
    setIsTraining(true);
    setTrainingProgress(0);
    toast.info("Training model with custom dataset...");
    
    // Simulate training process with progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        
        // Create new trained model
        const newModel: TrainedModel = {
          id: crypto.randomUUID(),
          name: `Custom ISL Model ${trainedModels.length + 1}`,
          gestures: Object.keys(gestureSamples),
          accuracy: Math.round(75 + Math.random() * 15),
          createdAt: new Date(),
          size: +(4 + Math.random() * 2).toFixed(1),
          isActive: true
        };
        
        setTrainedModels(prev => {
          // Set all previous models as inactive
          const updatedModels = prev.map(model => ({
            ...model,
            isActive: false
          }));
          
          return [...updatedModels, newModel];
        });
        
        toast.success("Model training complete");
      }
    }, 500);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
    toast.info("Training stopped");
  };

  const exportDataset = () => {
    try {
      const dataStr = JSON.stringify(gestureSamples, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'isl-custom-dataset.json');
      linkElement.click();
      
      toast.success("Dataset exported successfully");
    } catch (error) {
      console.error("Error exporting dataset:", error);
      toast.error("Failed to export dataset");
    }
  };

  const importDataset = (dataset: Record<string, GestureSample>) => {
    try {
      setGestureSamples(prev => ({
        ...prev,
        ...dataset
      }));
      
      toast.success("Dataset imported successfully");
    } catch (error) {
      console.error("Error importing dataset:", error);
      toast.error("Failed to import dataset");
    }
  };

  const setActiveModel = (modelId: string) => {
    setTrainedModels(prev =>
      prev.map(model => ({
        ...model,
        isActive: model.id === modelId
      }))
    );
    
    toast.success("Model activated");
  };

  const deleteModel = (modelId: string) => {
    setTrainedModels(prev => prev.filter(model => model.id !== modelId));
    toast.success("Model deleted");
  };

  return (
    <DatasetContext.Provider
      value={{
        gestureSamples,
        addGestureSample,
        updateGestureSample,
        clearGestureSamples,
        trainedModels,
        trainingProgress,
        isTraining,
        startTraining,
        stopTraining,
        exportDataset,
        importDataset,
        setActiveModel,
        deleteModel
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (context === undefined) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
};
