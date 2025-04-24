
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Camera, 
  Database, 
  Play,
  Pause, 
  Plus, 
  Save, 
  Check, 
  X, 
  BarChart4, 
  CameraOff,
  FileVideo,
  Webcam,
  FlaskConical,
  BookText,
  HardDrive
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const SAMPLE_GESTURES = [
  "Hello", "Thank You", "Please", "Yes", "No", 
  "Help", "Name", "Where", "How", "What",
  "Time", "Want", "Need", "Eat", "Drink",
  "Family", "Friend", "School", "Work", "Home"
];

const DatasetTraining = () => {
  const [activeTab, setActiveTab] = useState('collect');
  const [isRecording, setIsRecording] = useState(false);
  const [gestureName, setGestureName] = useState('');
  const [gestureDescription, setGestureDescription] = useState('');
  const [collectedSamples, setCollectedSamples] = useState<{[key: string]: number}>({});
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainedGestures, setTrainedGestures] = useState<string[]>([]);

  const startRecording = () => {
    if (!gestureName.trim()) {
      toast.error("Please enter a gesture name");
      return;
    }
    
    setIsRecording(true);
    toast.info(`Recording samples for "${gestureName}"...`);
    
    // Simulate sample collection (in a real app, this would capture frames/video)
    setTimeout(() => {
      setCollectedSamples(prev => ({
        ...prev,
        [gestureName]: (prev[gestureName] || 0) + 10
      }));
      setIsRecording(false);
      toast.success(`Collected 10 samples for "${gestureName}"`);
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped");
  };
  
  const addGestureToDataset = () => {
    if (!gestureName.trim()) {
      toast.error("Please enter a gesture name");
      return;
    }
    
    if (!collectedSamples[gestureName]) {
      toast.error("You need to collect samples first");
      return;
    }
    
    toast.success(`"${gestureName}" added to dataset`);
    setGestureName('');
    setGestureDescription('');
  };
  
  const startTraining = () => {
    const totalGestures = Object.keys(collectedSamples).length;
    
    if (totalGestures === 0) {
      toast.error("You need to collect samples for at least one gesture");
      return;
    }
    
    setIsTraining(true);
    toast.info("Training model with custom dataset...");
    
    // Simulate training process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        setTrainedGestures(Object.keys(collectedSamples));
        toast.success("Model training complete");
      }
    }, 500);
  };
  
  const getTotalSamples = () => {
    return Object.values(collectedSamples).reduce((sum, count) => sum + count, 0);
  };
  
  const clearDataset = () => {
    setCollectedSamples({});
    toast.info("Dataset cleared");
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
                      disabled={isRecording || !gestureName.trim() || !collectedSamples[gestureName]}
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
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg aspect-video flex flex-col items-center justify-center border border-white/10">
                    {isRecording ? (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto animate-pulse">
                          <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <p className="text-lg font-medium">Recording "{gestureName}"</p>
                        <p className="text-sm text-muted-foreground">Collecting samples...</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <CameraOff className="h-16 w-16 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Camera inactive</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => document.getElementById('videoUpload')?.click()}
                        >
                          <FileVideo className="h-3.5 w-3.5 mr-1.5" />
                          Upload Video
                          <input id="videoUpload" type="file" accept="video/*" className="hidden" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Collected Data</h4>
                    {Object.keys(collectedSamples).length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(collectedSamples).map(([name, count]) => (
                          <div 
                            key={name}
                            className="bg-white/50 dark:bg-gray-900/30 rounded-lg p-2 border border-white/20 dark:border-gray-800/20 text-sm flex justify-between items-center"
                          >
                            <span className="font-medium">{name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {count} samples
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No data collected yet</p>
                    )}
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
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="font-medium">Training Data Summary</h4>
                    <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg p-4 border border-white/20 dark:border-gray-800/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Gestures</p>
                          <p className="text-2xl font-bold">{Object.keys(collectedSamples).length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Samples</p>
                          <p className="text-2xl font-bold">{getTotalSamples()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Training Parameters</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Epochs</label>
                        <Input type="number" defaultValue="50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Learning Rate</label>
                        <Input type="number" defaultValue="0.001" step="0.001" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Batch Size</label>
                        <Input type="number" defaultValue="32" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Validation Split</label>
                        <Input type="number" defaultValue="0.2" step="0.1" max="0.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Advanced Options</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="flex items-center justify-center py-4">
                        <HardDrive className="mr-1.5 h-4 w-4" />
                        Import Dataset
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center justify-center py-4">
                        <Save className="mr-1.5 h-4 w-4" />
                        Export Dataset
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center justify-center py-4">
                        <BarChart4 className="mr-1.5 h-4 w-4" />
                        Data Visualization
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center justify-center py-4 text-destructive hover:text-destructive"
                        onClick={clearDataset}
                      >
                        <X className="mr-1.5 h-4 w-4" />
                        Clear Dataset
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Training Progress</h4>
                        {isTraining && <Badge className="bg-green-500">Training</Badge>}
                      </div>
                      <Progress value={trainingProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{trainingProgress}% Complete</span>
                        <span>{isTraining ? 'Estimated time: 2:45 remaining' : 'Ready to train'}</span>
                      </div>
                    </div>
                    
                    {isTraining ? (
                      <div className="space-y-2">
                        <div className="bg-white/80 dark:bg-gray-900/50 rounded-lg p-3 border border-white/20 dark:border-gray-800/20 h-32 overflow-y-auto font-mono text-xs">
                          <div className="text-green-600 dark:text-green-400">
                            [INFO] Initializing model training...<br />
                            [INFO] Loading dataset with {getTotalSamples()} samples<br />
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
                          onClick={() => setIsTraining(false)}
                        >
                          <X className="mr-2 h-5 w-5" />
                          Stop Training
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 py-6 text-lg"
                        onClick={startTraining}
                        disabled={Object.keys(collectedSamples).length === 0}
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
              </div>
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Trained Models</h4>
                  {trainedGestures.length > 0 ? (
                    <div className="space-y-3">
                      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 overflow-hidden">
                        <div className="bg-primary/10 p-3 border-b border-primary/20 flex justify-between items-center">
                          <div className="font-medium">Custom ISL Model</div>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">Created</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">Gestures</span>
                            <span>{trainedGestures.length}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-muted-foreground">Accuracy</span>
                            <span>87%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Size</span>
                            <span>4.2 MB</span>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <Save className="mr-1.5 h-4 w-4" />
                              Export
                            </Button>
                            <Button variant="destructive" size="sm" className="w-full">
                              <X className="mr-1.5 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 p-3">
                        <h5 className="font-medium mb-2">Included Gestures</h5>
                        <div className="flex flex-wrap gap-2">
                          {trainedGestures.map(gesture => (
                            <Badge key={gesture} variant="outline" className="bg-white/50">
                              {gesture}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/50 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-800/20 p-6 flex flex-col items-center justify-center h-64">
                      <FileVideo className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No custom models trained yet</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => setActiveTab('train')}
                      >
                        Train Your First Model
                      </Button>
                    </div>
                  )}
                </div>
                
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetTraining;
