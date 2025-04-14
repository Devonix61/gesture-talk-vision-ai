
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Camera, CameraOff, Settings, Volume2 } from 'lucide-react';

// We'll need to install MediaPipe for hand tracking
interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

type Prediction = {
  gesture: string;
  score: number;
};

const HandGestureRecognizer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // This would be where we initialize MediaPipe in a real implementation
    // For now, we'll simulate the initialization process and then show demo content
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        setIsRecording(true);
        setErrorMessage('');
        
        // In a real implementation, we would start the MediaPipe hand tracking here
        simulateHandTracking();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setErrorMessage('Camera access denied. Please check your permissions.');
    }
  };

  const stopCamera = () => {
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
    }
  };

  const simulateHandTracking = () => {
    // In a real implementation, this would be actual hand tracking
    // For demo purposes, we'll simulate detecting some gestures
    
    const gestures = [
      { gesture: "Hello", score: 0.92 },
      { gesture: "Thank you", score: 0.87 },
      { gesture: "Please", score: 0.79 },
      { gesture: "Help", score: 0.85 },
      { gesture: "Yes", score: 0.94 },
      { gesture: "No", score: 0.91 }
    ];
    
    let currentIndex = 0;
    
    // Simulate hand tracking visualization on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval);
        return;
      }
      
      // Get the current gesture and update
      const currentGesture = gestures[currentIndex];
      setPrediction(currentGesture);
      
      // Add to transcript occasionally
      if (Math.random() > 0.7) {
        setTranscript(prev => prev ? `${prev} ${currentGesture.gesture}` : currentGesture.gesture);
      }
      
      // Simulate drawing hand landmarks
      const videoWidth = videoRef.current?.videoWidth || 640;
      const videoHeight = videoRef.current?.videoHeight || 480;
      
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw simulated hand landmarks
      const centerX = videoWidth / 2 + (Math.random() * 100 - 50);
      const centerY = videoHeight / 2 + (Math.random() * 100 - 50);
      
      // Draw palm
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.fill();
      
      // Draw fingers
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI / 2.5) - (Math.PI / 5);
        const length = 80 + Math.random() * 20;
        
        const fingerX = centerX + Math.cos(angle) * length;
        const fingerY = centerY + Math.sin(angle) * length;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(fingerX, fingerY);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.7)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Finger tip
        ctx.beginPath();
        ctx.arc(fingerX, fingerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.7)';
        ctx.fill();
      }
      
      // Move to the next gesture for simulation
      currentIndex = (currentIndex + 1) % gestures.length;
    }, 1500);
    
    return () => clearInterval(interval);
  };

  const speakTranscript = () => {
    if (transcript && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {isInitializing ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg animate-pulse">
          <Loader2 className="w-12 h-12 text-isl-primary animate-spin mb-4" />
          <p className="text-lg font-medium text-isl-text">Initializing ISL Recognition System...</p>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button 
                  onClick={startCamera}
                  className="bg-isl-primary hover:bg-isl-primary/90 text-white"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              </div>
            )}
            
            {prediction && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <Badge variant="secondary" className="bg-isl-secondary text-white px-3 py-1.5 text-lg">
                  {prediction.gesture}
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-isl-text px-2 py-1">
                  Confidence: {Math.round(prediction.score * 100)}%
                </Badge>
              </div>
            )}
          </div>
          
          {errorMessage && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          
          <div className="flex space-x-2 mb-6">
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
                className="bg-isl-primary hover:bg-isl-primary/90 text-white"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Camera
              </Button>
            )}
            
            <Button variant="outline">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
          
          <Card className="translation-panel">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Translation Output</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={speakTranscript}
                    disabled={!transcript}
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Speak
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearTranscript}
                    disabled={!transcript}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              
              <div className="min-h-32 p-4 bg-muted rounded-md">
                {transcript ? (
                  <p className="text-lg">{transcript}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Sign language translation will appear here...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default HandGestureRecognizer;
