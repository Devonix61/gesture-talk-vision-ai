
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  Camera, 
  CameraOff, 
  Settings, 
  Volume2, 
  MessageSquare, 
  X, 
  Save, 
  RefreshCw,
  Maximize2,
  Info,
  BarChart3 
} from 'lucide-react';
import { 
  createGestureRecognizer, 
  recognizeGestures, 
  clearGestureHistory, 
  disposeGestureRecognizer, 
  type RecognizedGesture 
} from '@/utils/handGestureRecognition';
import { combineGestures, detectSentiment } from '@/utils/nlpService';
import { speakWithEmotion, VoiceType, defaultVoiceSettings } from '@/utils/speechService';
import { toast } from '@/components/ui/sonner';

const HandGestureRecognizer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [prediction, setPrediction] = useState<RecognizedGesture | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [recognizedGestures, setRecognizedGestures] = useState<string[]>([]);
  const [isProcessingFrame, setIsProcessingFrame] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    type: VoiceType.NEUTRAL,
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0
  });

  // Latest gestures returned by model
  const [latestGestures, setLatestGestures] = useState<{ name: string, confidence: number }[]>([]);
  // Recognition statistics
  const [stats, setStats] = useState({
    totalGestures: 0,
    highConfidence: 0, // > 80%
    mediumConfidence: 0, // 60-80%
    lowConfidence: 0, // < 60%
    avgConfidence: 0
  });

  useEffect(() => {
    const initRecognizer = async () => {
      try {
        console.log("Initializing gesture recognizer...");
        const success = await createGestureRecognizer();
        setIsInitializing(false);
        
        if (!success) {
          setErrorMessage('Failed to initialize the gesture recognizer. Please check your browser compatibility.');
          toast.error('Failed to initialize gesture recognizer');
        } else {
          console.log("Gesture recognizer initialized successfully");
          toast.success('Gesture recognizer initialized successfully', {
            duration: 3000,
            className: 'bg-green-50 border border-green-200',
          });
        }
      } catch (error) {
        console.error("Error in initRecognizer:", error);
        setIsInitializing(false);
        setErrorMessage('Error initializing the gesture recognizer: ' + (error instanceof Error ? error.message : String(error)));
        toast.error('Error initializing gesture recognizer');
      }
    };
    
    initRecognizer();
    
    // Clean up on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      disposeGestureRecognizer();
    };
  }, []);

  useEffect(() => {
    if (!isRecording || !videoRef.current) return;

    let lastGestureTime = 0;
    const processFrame = () => {
      if (!videoRef.current || !canvasRef.current || !isRecording) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (!isProcessingFrame) {
        setIsProcessingFrame(true);
        const now = Date.now();
        if (now - lastGestureTime > 300) {
          lastGestureTime = now;

          // Recognize gestures & surface all returned by MediaPipe
          const results = recognizeGestures(video, performance.now(), (gesture) => {
            setPrediction(gesture);
            
            // Add to recognized gestures list if not empty
            if (gesture.gestureName && gesture.gestureName.trim() !== '') {
              setRecognizedGestures(prev => {
                const newGestures = [...prev, gesture.gestureName];
                
                // Limit to last 10 gestures
                if (newGestures.length > 10) {
                  return newGestures.slice(newGestures.length - 10);
                }
                
                return newGestures;
              });
              
              // Form sentence from gestures
              const sentence = combineGestures([...recognizedGestures, gesture.gestureName]);
              if (sentence) {
                setTranscript(sentence);
              }
              
              // Update stats
              setStats(prev => {
                const confidence = gesture.confidence;
                let highConf = prev.highConfidence;
                let medConf = prev.mediumConfidence;
                let lowConf = prev.lowConfidence;
                
                if (confidence > 0.8) highConf++;
                else if (confidence > 0.6) medConf++;
                else lowConf++;
                
                const total = prev.totalGestures + 1;
                const newAvg = (prev.avgConfidence * prev.totalGestures + confidence) / total;
                
                return {
                  totalGestures: total,
                  highConfidence: highConf,
                  mediumConfidence: medConf,
                  lowConfidence: lowConf,
                  avgConfidence: newAvg
                };
              });
            }
          });

          // Show all gestures detected in the latest frame (with confidences)
          if (results?.gestures && results.gestures.length > 0) {
            setLatestGestures(
              results.gestures[0]
                .filter((g) => g.score > 0.25) // show almost everything for user feedback
                .map((g) => ({
                  name: g.categoryName.replace(/_/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()),
                  confidence: Math.round(g.score * 100)
                }))
            );
          } else {
            setLatestGestures([]);
          }

          if (results && results.landmarks) {
            results.landmarks.forEach(landmarkList => {
              // Draw landmarks with enhanced visual style
              landmarkList.forEach((landmark, index) => {
                // Draw glowing dots for landmarks
                ctx.beginPath();
                ctx.arc(
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  5,
                  0,
                  2 * Math.PI
                );
                const gradient = ctx.createRadialGradient(
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  0,
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  8
                );
                gradient.addColorStop(0, 'rgba(96, 165, 250, 0.9)');
                gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Draw core point
                ctx.beginPath();
                ctx.arc(
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  3,
                  0,
                  2 * Math.PI
                );
                ctx.fillStyle = 'rgba(96, 165, 250, 1)';
                ctx.fill();
                
                // Connect landmarks to form hand shape with gradient lines
                if (index > 0) {
                  // Connect to previous landmark in same finger
                  const prevLandmark = landmarkList[index - 1];
                  const gradient = ctx.createLinearGradient(
                    prevLandmark.x * canvas.width,
                    prevLandmark.y * canvas.height,
                    landmark.x * canvas.width,
                    landmark.y * canvas.height
                  );
                  gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
                  gradient.addColorStop(1, 'rgba(96, 165, 250, 0.8)');
                  
                  ctx.beginPath();
                  ctx.moveTo(
                    prevLandmark.x * canvas.width,
                    prevLandmark.y * canvas.height
                  );
                  ctx.lineTo(
                    landmark.x * canvas.width,
                    landmark.y * canvas.height
                  );
                  ctx.strokeStyle = gradient;
                  ctx.lineWidth = 2;
                  ctx.stroke();
                }
              });
            });
          }
        }
        setIsProcessingFrame(false);
      }
      animationRef.current = requestAnimationFrame(processFrame);
    };
    animationRef.current = requestAnimationFrame(processFrame);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRecording, isProcessingFrame, recognizedGestures]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      };
      
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsRecording(true);
              setErrorMessage('');
              setRecognizedGestures([]);
              clearGestureHistory();
              toast.success('Camera activated', {
                className: 'bg-green-50 border border-green-200',
              });
            }).catch(err => {
              console.error("Error playing video:", err);
              setErrorMessage('Error playing video: ' + err.message);
              toast.error('Error playing video');
            });
          }
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setErrorMessage('Camera access denied. Please check your permissions.');
      toast.error('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
      setPrediction(null);
      
      // Clear the canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      toast.info('Camera stopped');
    }
  };

  const speakTranscript = () => {
    if (transcript) {
      setIsSpeaking(true);
      const sentiment = detectSentiment(transcript);
      
      speakWithEmotion(
        transcript, 
        sentiment, 
        voiceSettings,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
      
      toast.success('Speaking text');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setRecognizedGestures([]);
    clearGestureHistory();
    toast.info('Transcript cleared');
  };

  const saveTranscript = () => {
    if (!transcript) return;
    
    // Create blob and download link
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isl-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Transcript saved to file');
  };
  
  const resetStats = () => {
    setStats({
      totalGestures: 0,
      highConfidence: 0,
      mediumConfidence: 0,
      lowConfidence: 0,
      avgConfidence: 0
    });
  };
  
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent bg-clip-text text-transparent">
            Sign Language Recognition
          </h3>
          <p className="text-muted-foreground text-sm">
            Use hand gestures in front of your camera to translate sign language in real-time
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isInitializing ? (
        <div className="flex flex-col items-center justify-center h-72 bg-white/40 dark:bg-gray-900/40 rounded-xl animate-pulse border border-primary/10 backdrop-blur-sm shadow-lg">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 animate-pulse-ring absolute inset-0"></div>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center relative">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          <p className="text-lg font-medium mt-6 text-foreground/80">Initializing ISL Recognition System</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a few moments...</p>
        </div>
      ) : (
        <>
          <div className={`grid ${showAnalytics ? 'grid-cols-1 md:grid-cols-3 gap-6' : ''}`}>
            <div className={`${showAnalytics ? 'md:col-span-2' : ''}`}>
              <div className={`camera-container ${fullscreen ? 'fixed inset-4 z-50 max-w-none flex items-center justify-center bg-black/80' : 'aspect-video'} transition-all duration-300`}>
                <div className={`relative ${fullscreen ? 'w-auto max-w-[90%] max-h-[90%] aspect-video' : 'w-full'}`}>
                  <video 
                    ref={videoRef} 
                    className="camera-feed rounded-xl shadow-lg w-full h-full"
                    autoPlay 
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                  />

                  {!isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
                      <div className="text-center space-y-6">
                        <Button 
                          onClick={startCamera}
                          className="btn-primary group px-6 py-6 text-lg"
                          size="lg"
                        >
                          <Camera className="mr-3 h-6 w-6 group-hover:animate-bounce-subtle" />
                          Start Camera
                        </Button>
                        <p className="text-white/70 text-sm max-w-xs mx-auto">
                          Your camera feed is processed locally and never stored or transmitted
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Main gesture indication: Latest recognized gesture */}
                  {prediction && (
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                      <Badge className="bg-gradient-to-r from-isl-primary to-isl-secondary text-white px-4 py-2 text-lg shadow-lg backdrop-blur-sm rounded-full">
                        {prediction.gestureName}
                      </Badge>
                      <Badge variant="outline" className="bg-black/60 text-white px-3 py-1.5 shadow backdrop-blur-sm rounded-full">
                        <span className={`mr-1 inline-block w-2 h-2 rounded-full ${
                          prediction.confidence > 0.8 ? 'bg-green-400' : 
                          prediction.confidence > 0.6 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></span>
                        Confidence: {Math.round(prediction.confidence * 100)}%
                      </Badge>
                    </div>
                  )}
                  {/* Display all detected gestures inline for transparency */}
                  {latestGestures.length > 0 && (
                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md rounded-lg shadow-lg px-3 py-2 border border-white/10 flex flex-col space-y-1 min-w-[160px] pointer-events-auto">
                      <div className="font-medium text-white text-xs mb-1">Detected Gestures</div>
                      {latestGestures.slice(0, 5).map((g, idx) => (
                        <div key={g.name+idx} className="flex items-center justify-between text-xs">
                          <span className="text-white/90">{g.name}</span>
                          <span className="ml-2 text-white/60">{g.confidence}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {fullscreen && (
                    <Button 
                      variant="outline"
                      size="sm"
                      className="absolute top-4 left-4 bg-black/50 text-white border-white/10 hover:bg-black/70"
                      onClick={toggleFullscreen}
                    >
                      Exit Fullscreen
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {showAnalytics && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 p-5 shadow-lg animate-slide-in-right">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Recognition Analytics</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={resetStats}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Total Gestures Recognized</span>
                      <span className="font-medium">{stats.totalGestures}</span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-isl-primary to-isl-secondary h-full rounded-full"
                        style={{ width: `${Math.min(100, stats.totalGestures / 2)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <ConfidenceCard 
                      title="High Confidence"
                      count={stats.highConfidence}
                      color="bg-green-500"
                      percentage={stats.totalGestures ? Math.round((stats.highConfidence / stats.totalGestures) * 100) : 0}
                    />
                    <ConfidenceCard 
                      title="Medium"
                      count={stats.mediumConfidence}
                      color="bg-yellow-500"
                      percentage={stats.totalGestures ? Math.round((stats.mediumConfidence / stats.totalGestures) * 100) : 0}
                    />
                    <ConfidenceCard 
                      title="Low"
                      count={stats.lowConfidence}
                      color="bg-red-500"
                      percentage={stats.totalGestures ? Math.round((stats.lowConfidence / stats.totalGestures) * 100) : 0}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Average Confidence</span>
                      <span className="font-medium">{(stats.avgConfidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          stats.avgConfidence > 0.8 ? 'bg-green-500' : 
                          stats.avgConfidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stats.avgConfidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-200">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        For best results, ensure good lighting and position your hands clearly in frame. 
                        The system works best with distinct, deliberate gestures.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Error</h3>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {isRecording ? (
              <Button 
                onClick={stopCamera} 
                variant="destructive"
                className="flex items-center"
              >
                <CameraOff className="mr-2 h-5 w-5" />
                Stop Camera
              </Button>
            ) : (
              <Button 
                onClick={startCamera}
                className="btn-primary group"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Camera
              </Button>
            )}
            
            <Button 
              variant={isSpeaking ? "secondary" : "outline"}
              disabled={!transcript}
              onClick={speakTranscript}
              className={`transition-all duration-300 ${
                isSpeaking ? "bg-accent text-accent-foreground border-accent" : ""
              }`}
            >
              <Volume2 className={`mr-2 h-5 w-5 ${isSpeaking ? "animate-pulse" : ""}`} />
              {isSpeaking ? "Speaking..." : "Speak"}
            </Button>
            
            <Button 
              variant="outline"
              disabled={!transcript}
              onClick={clearTranscript}
            >
              <X className="mr-2 h-5 w-5" />
              Clear
            </Button>
            
            <Button 
              variant="outline"
              disabled={!transcript}
              onClick={saveTranscript}
            >
              <Save className="mr-2 h-5 w-5" />
              Save
            </Button>
            
            <Button variant="outline">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
          
          <Card className="translation-panel">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Translation Output</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-muted flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{recognizedGestures.length} gestures</span>
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-6">
                {recognizedGestures.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {recognizedGestures.map((gesture, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs py-1 px-2 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                      >
                        {gesture}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="min-h-32 p-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm rounded-lg border border-white/40 dark:border-gray-800/40 shadow-inner">
                  {transcript ? (
                    <p className="text-xl leading-relaxed">{transcript}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <p className="italic">
                        Sign language translation will appear here...
                      </p>
                      <p className="text-xs mt-2 max-w-md text-center">
                        Make hand gestures in front of the camera to see them translated in real-time
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const ConfidenceCard = ({ 
  title, 
  count, 
  color, 
  percentage 
}: { 
  title: string, 
  count: number, 
  color: string, 
  percentage: number 
}) => (
  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 border border-white/20 dark:border-gray-800/20">
    <div className="text-xs text-muted-foreground">{title}</div>
    <div className="mt-1 font-medium text-xl">{count}</div>
    <div className="mt-1 flex items-center justify-between text-xs">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span>{percentage}%</span>
    </div>
  </div>
);

export default HandGestureRecognizer;
