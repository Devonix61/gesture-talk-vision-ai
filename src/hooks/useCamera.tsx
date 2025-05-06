
import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

type UseCameraProps = {
  onFrame?: (videoElement: HTMLVideoElement) => void;
  frameRate?: number;
};

export const useCamera = ({ onFrame, frameRate = 30 }: UseCameraProps = {}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameIntervalRef = useRef<number>(1000 / frameRate);
  
  // Function to process video frames
  const processFrame = useCallback((timestamp: number) => {
    if (!isActive || !videoRef.current) {
      animationFrameRef.current = null;
      return;
    }

    // Limit frame processing based on framerate
    if (timestamp - lastFrameTimeRef.current >= frameIntervalRef.current) {
      if (onFrame) {
        onFrame(videoRef.current);
      }
      lastFrameTimeRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [isActive, onFrame]);

  // Initialize camera
  const initCamera = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          video: {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsPermissionGranted(true);
          setIsInitialized(true);
          toast.success("Camera initialized successfully");
        }
      } else {
        toast.error("Camera access not supported in this browser");
        setIsPermissionGranted(false);
      }
    } catch (error) {
      console.error('Error initializing camera:', error);
      setIsPermissionGranted(false);
      
      if ((error as Error).name === 'NotAllowedError') {
        toast.error("Camera permission denied. Please enable camera access and try again.");
      } else {
        toast.error("Failed to initialize camera");
      }
    }
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    if (!isInitialized) {
      await initCamera();
    }

    if (videoRef.current && streamRef.current) {
      videoRef.current.play();
      setIsActive(true);
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
  }, [isInitialized, initCamera, processFrame]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
    }

    setIsActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update frame interval when frameRate changes
  useEffect(() => {
    frameIntervalRef.current = 1000 / frameRate;
  }, [frameRate]);

  return {
    videoRef,
    isActive,
    isInitialized,
    isPermissionGranted,
    initCamera,
    startCamera,
    stopCamera
  };
};
