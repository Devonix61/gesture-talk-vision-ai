
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Camera, CameraOff, Settings, Volume2, MessageSquare, X, Save } from 'lucide-react';
import { createGestureRecognizer, recognizeGestures, clearGestureHistory, disposeGestureRecognizer, type RecognizedGesture } from '@/utils/handGestureRecognition';
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
  const [voiceSettings, setVoiceSettings] = useState({
    type: VoiceType.NEUTRAL,
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0
  });

  // Initialize the gesture recognizer
  useEffect(() => {
    const initRecognizer = async () => {
      try {
        console.log("Initializing gesture recognizer...");
        const success = await createGestureRecognizer();
        setIsInitializing(false);
        
        if (!success) {
          setErrorMessage('Failed to initialize the gesture recognizer. Please try again or check your browser compatibility.');
          toast.error('Failed to initialize gesture recognizer');
        } else {
          console.log("Gesture recognizer initialized successfully");
          toast.success('Gesture recognizer initialized successfully');
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

  // Process video frames for gesture recognition
  useEffect(() => {
    if (!isRecording || !videoRef.current) return;
    
    let lastGestureTime = 0;
    
    const processFrame = () => {
      if (!videoRef.current || !canvasRef.current || !isRecording) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Update canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame on canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Process gesture only if we're not already processing a frame
      if (!isProcessingFrame) {
        setIsProcessingFrame(true);
        
        // Process gestures at a reasonable rate (every 300ms)
        const now = Date.now();
        if (now - lastGestureTime > 300) {
          lastGestureTime = now;
          
          // Recognize gestures
          const results = recognizeGestures(video, performance.now(), (gesture) => {
            // Handle new gesture
            setPrediction(gesture);
            console.log("New gesture detected:", gesture.gestureName, "with confidence:", gesture.confidence);
            
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
            }
          });
          
          // Draw landmarks if available
          if (results && results.landmarks) {
            results.landmarks.forEach(landmarkList => {
              // Draw landmarks
              landmarkList.forEach((landmark, index) => {
                ctx.beginPath();
                ctx.arc(
                  landmark.x * canvas.width,
                  landmark.y * canvas.height,
                  6,
                  0,
                  2 * Math.PI
                );
                ctx.fillStyle = 'rgba(96, 165, 250, 0.7)';
                ctx.fill();
                
                // Connect landmarks to form hand shape
                if (index > 0) {
                  // Connect to previous landmark in same finger
                  const prevLandmark = landmarkList[index - 1];
                  ctx.beginPath();
                  ctx.moveTo(
                    prevLandmark.x * canvas.width,
                    prevLandmark.y * canvas.height
                  );
                  ctx.lineTo(
                    landmark.x * canvas.width,
                    landmark.y * canvas.height
                  );
                  ctx.strokeStyle = 'rgba(139, 92, 246, 0.7)';
                  ctx.lineWidth = 3;
                  ctx.stroke();
                }
              });
            });
          }
        }
        
        setIsProcessingFrame(false);
      }
      
      // Continue processing frames
      animationRef.current = requestAnimationFrame(processFrame);
    };
    
    // Start processing frames
    animationRef.current = requestAnimationFrame(processFrame);
    
    // Clean up animation frame on unmount or when recording stops
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isRecording, isProcessingFrame, recognizedGestures]);

  const startCamera = async () => {
    try {
      console.log("Starting camera...");
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
              console.log("Camera started successfully");
              toast.success('Camera started successfully');
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
      
      console.log("Camera stopped");
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
      
      toast.success('Speaking transcript');
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
    
    toast.success('Transcript saved');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {isInitializing ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg animate-pulse">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium">Initializing ISL Recognition System...</p>
        </div>
      ) : (
        <>
          <div className="camera-container aspect-video mb-4">
            <video 
              ref={videoRef} 
              className="camera-feed"
              autoPlay 
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
            
            {!isRecording && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <Button 
                  onClick={startCamera}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              </div>
            )}
            
            {prediction && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <Badge variant="secondary" className="bg-secondary text-white px-3 py-1.5 text-lg">
                  {prediction.gestureName}
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-foreground px-2 py-1">
                  Confidence: {Math.round(prediction.confidence * 100)}%
                </Badge>
              </div>
            )}
          </div>
          
          {errorMessage && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-6">
            {isRecording ? (
              <Button 
                onClick={stopCamera} 
                variant="destructive"
              >
                <CameraOff className="mr-2 h-5 w-5" />
                Stop Camera
              </Button>
            ) : (
              <Button 
                onClick={startCamera}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Camera
              </Button>
            )}
            
            <Button 
              variant="outline"
              disabled={!transcript}
              onClick={speakTranscript}
              className={isSpeaking ? "bg-accent text-accent-foreground" : ""}
            >
              <Volume2 className="mr-2 h-5 w-5" />
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
                <h3 className="text-lg font-medium">Translation Output</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-muted">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {recognizedGestures.length} gestures
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                {recognizedGestures.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {recognizedGestures.map((gesture, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {gesture}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="min-h-32 p-4 bg-muted rounded-md">
                  {transcript ? (
                    <p className="text-lg">{transcript}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Sign language translation will appear here...
                    </p>
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

export default HandGestureRecognizer;
