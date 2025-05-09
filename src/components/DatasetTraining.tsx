
import { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Camera, 
  Database, 
  Plus, 
  Pause, 
  Webcam,
  FlaskConical,
  BookText,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { DatasetProvider, useDataset } from '@/context/DatasetContext';
import CameraView from './dataset/CameraView';
import GestureSamplesDisplay from './dataset/GestureSamplesDisplay';
import TrainingParameters from './dataset/TrainingParameters';
import TrainingProgress from './dataset/TrainingProgress';
import ModelsList from './dataset/ModelsList';
import DefaultModels from './dataset/DefaultModels';

const SAMPLE_GESTURES = [
  "Hello", "Thank You", "Please", "Yes", "No", 
  "Help", "Name", "Where", "How", "What",
  "Time", "Want", "Need", "Eat", "Drink",
  "Family", "Friend", "School", "Work", "Home",
  "Sorry", "Peace", "Love", "When", "Why",
  "Who", "Stop", "Zero", "One", "Two", 
  "Three", "Four", "Five", "Six", "Seven", 
  "Eight", "Nine", "Left", "Right", "Big", "Small"
];

const DatasetTrainingContent = () => {
  const [activeTab, setActiveTab] = useState('collect');
  const [isRecording, setIsRecording] = useState(false);
  const [gestureName, setGestureName] = useState('');
  const [gestureDescription, setGestureDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    gestureSamples,
    addGestureSample,
    clearGestureSamples,
    exportDataset,
    startTraining,
    stopTraining,
    isTraining,
    trainingProgress,
    trainedModels,
    setActiveModel,
    deleteModel
  } = useDataset();
  
  const startRecording = () => {
    if (!gestureName.trim()) {
      toast.error("Please enter a gesture name");
      return;
    }
    
    setIsRecording(true);
    toast.info(`Recording samples for "${gestureName}"...`);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped");
  };
  
  const handleRecordingComplete = (frames: number) => {
    if (frames > 0 && gestureName) {
      addGestureSample(gestureName, gestureDescription, frames);
    }
  };
  
  const addGestureToDataset = () => {
    if (!gestureName.trim()) {
      toast.error("Please enter a gesture name");
      return;
    }
    
    if (!gestureSamples[gestureName]) {
      toast.error("You need to collect samples first");
      return;
    }
    
    toast.success(`"${gestureName}" added to dataset`);
    setGestureName('');
    setGestureDescription('');
  };
  
  const handleImportDatasetClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        // Here we'd validate the data structure before importing
        toast.success("Dataset imported successfully");
      } catch (error) {
        toast.error("Invalid dataset file format");
      }
    };
    reader.readAsText(file);
  }, []);
  
  const handleFrameCapture = useCallback((videoElement: HTMLVideoElement) => {
    // In a real implementation, this would process and extract features from each frame
    // using a computer vision library or model
    console.log("Frame captured from video element", videoElement.currentTime);
  }, []);
  
  const getTotalSamples = () => {
    return Object.values(gestureSamples).reduce((sum, gesture) => sum + gesture.sampleCount, 0);
  };
  
  const handleSelectGesture = (name: string) => {
    setGestureName(name);
    if (gestureSamples[name]?.description) {
      setGestureDescription(gestureSamples[name].description || '');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
                Custom Dataset Training
              </h3>
              <p className="text-muted-foreground mt-1">
                Create personalized sign language recognition models with your own data
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1.5 bg-primary/10 text-primary">
              <Database className="mr-1.5 h-3.5 w-3.5" />
              <span>{getTotalSamples()} Samples</span>
            </Badge>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="collect" className="flex items-center gap-2">
                <Webcam className="h-4 w-4" />
                <span>Collect Data</span>
              </TabsTrigger>
              <TabsTrigger value="train" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span>Train Model</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <BookText className="h-4 w-4" />
                <span>Manage Models</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="collect" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Gesture Name</label>
                    <Input 
                      placeholder="e.g., Hello, Thank You, Help" 
                      value={gestureName} 
                      onChange={e => setGestureName(e.target.value)}
                      disabled={isRecording}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                    <Textarea 
                      placeholder="Describe the gesture and its meaning" 
                      value={gestureDescription}
                      onChange={e => setGestureDescription(e.target.value)}
                      disabled={isRecording}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {isRecording ? (
                      <Button
                        variant="destructive"
                        onClick={stopRecording}
                        className="flex items-center"
                      >
                        <Pause className="mr-2 h-5 w-5" />
                        Stop Recording
                      </Button>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 transition-opacity"
                        onClick={startRecording}
                        disabled={!gestureName.trim()}
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Start Recording
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={addGestureToDataset}
                      disabled={isRecording || !gestureName.trim() || !gestureSamples[gestureName]}
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add to Dataset
                    </Button>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Camera className="h-4 w-4 mr-1.5" />
                      Recording Tips
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Ensure good lighting and a clear background</li>
                      <li>Show full hand gestures within the frame</li>
                      <li>Collect samples from different angles and positions</li>
                      <li>Consider recording with different people for diverse training</li>
                      <li>Aim for at least 50 samples per gesture</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <CameraView 
                    isRecording={isRecording} 
                    gestureName={gestureName}
                    onFrameCapture={handleFrameCapture}
                    onRecordingComplete={handleRecordingComplete}
                  />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Collected Data</h4>
                    <GestureSamplesDisplay 
                      samples={gestureSamples} 
                      onSelectGesture={handleSelectGesture}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Common ISL Gestures</h4>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_GESTURES.slice(0, 12).map(gesture => (
                        <Badge 
                          key={gesture}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setGestureName(gesture)}
                        >
                          {gesture}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="train" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <TrainingParameters 
                  totalGestures={Object.keys(gestureSamples).length}
                  totalSamples={getTotalSamples()}
                  onClearDataset={clearGestureSamples}
                  onExportDataset={exportDataset}
                  onImportDatasetClick={handleImportDatasetClick}
                  onVisualizationClick={() => toast.info("Data visualization - Feature coming soon")}
                />
                
                <TrainingProgress 
                  isTraining={isTraining}
                  progress={trainingProgress}
                  onStartTraining={startTraining}
                  onStopTraining={stopTraining}
                  canStartTraining={Object.keys(gestureSamples).length > 0}
                />
              </div>
              
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".json" 
                onChange={handleFileImport} 
                className="hidden" 
              />
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Trained Models</h4>
                  <ModelsList 
                    models={trainedModels}
                    onExportModel={(id) => toast.info(`Exporting model ${id}`)}
                    onDeleteModel={deleteModel}
                    onActivateModel={setActiveModel}
                  />
                </div>
                
                <DefaultModels />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const DatasetTraining = () => (
  <DatasetProvider>
    <DatasetTrainingContent />
  </DatasetProvider>
);

export default DatasetTraining;
