
import React, { useCallback, useEffect, useState } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, FileVideo, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type CameraViewProps = {
  isRecording: boolean;
  gestureName: string;
  onFrameCapture?: (videoElement: HTMLVideoElement) => void;
  onRecordingComplete?: (frames: number) => void;
};

const CameraView = ({ 
  isRecording, 
  gestureName, 
  onFrameCapture,
  onRecordingComplete
}: CameraViewProps) => {
  const [capturedFrames, setCapturedFrames] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const handleFrame = useCallback((videoElement: HTMLVideoElement) => {
    if (isRecording && onFrameCapture) {
      onFrameCapture(videoElement);
      setCapturedFrames(prev => prev + 1);
    }
  }, [isRecording, onFrameCapture]);
  
  const { 
    videoRef, 
    isActive, 
    isPermissionGranted, 
    startCamera, 
    stopCamera 
  } = useCamera({ onFrame: handleFrame, frameRate: 10 });
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }
    
    // Create URL for the uploaded video
    const fileUrl = URL.createObjectURL(file);
    setUploadedFile(fileUrl);
    toast.success(`Uploaded video: ${file.name}`);
  };
  
  // Clear uploaded file
  const clearUploadedFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile);
      setUploadedFile(null);
    }
  };
  
  // Start camera when recording starts
  useEffect(() => {
    if (isRecording && !isActive && !uploadedFile) {
      startCamera();
      setCapturedFrames(0);
      setRecordingTime(0);
    } else if (!isRecording && isActive) {
      stopCamera();
      
      if (onRecordingComplete && capturedFrames > 0) {
        onRecordingComplete(capturedFrames);
      }
    }
  }, [isRecording, isActive, startCamera, stopCamera, uploadedFile, onRecordingComplete, capturedFrames]);
  
  // Timer for recording duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  return (
    <div className="space-y-4">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg aspect-video flex flex-col items-center justify-center border border-white/10">
        {uploadedFile ? (
          <div className="relative w-full h-full">
            <video 
              src={uploadedFile}
              className="w-full h-full object-cover rounded-lg"
              controls
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearUploadedFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : isRecording ? (
          <div className="text-center space-y-4 w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg hidden"
              autoPlay
              playsInline
              muted
            />
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto animate-pulse">
              <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse"></div>
            </div>
            <p className="text-lg font-medium">Recording "{gestureName}"</p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">Frames: {capturedFrames}</p>
              <p className="text-sm text-muted-foreground">Time: {recordingTime}s</p>
            </div>
          </div>
        ) : isActive || isPermissionGranted === null ? (
          <div className="text-center space-y-4 w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              playsInline
              muted
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-4 right-4"
              onClick={startCamera}
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Start Camera
            </Button>
          </div>
        ) : isPermissionGranted === false ? (
          <div className="text-center space-y-4">
            <CameraOff className="h-16 w-16 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Camera permission denied</p>
            <Button
              variant="outline"
              size="sm"
              onClick={startCamera}
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CameraOff className="h-16 w-16 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Camera inactive</p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={startCamera}
              >
                <Camera className="h-3.5 w-3.5 mr-1.5" />
                Start Camera
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('videoUpload')?.click()}
              >
                <FileVideo className="h-3.5 w-3.5 mr-1.5" />
                Upload Video
                <input 
                  id="videoUpload" 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraView;
