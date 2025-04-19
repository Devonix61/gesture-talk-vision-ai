import { FilesetResolver, GestureRecognizer, type GestureRecognizerResult } from '@mediapipe/tasks-vision';

// Define recognized gestures types
export type RecognizedGesture = {
  gestureName: string; 
  confidence: number;
  timestamp: number;
};

let gestureRecognizer: GestureRecognizer | null = null;
let lastVideoTime = -1;
let results: GestureRecognizerResult | null = null;
const gestureHistory: RecognizedGesture[] = [];

// Map of gesture names to their meaning in ISL
const gestureToMeaning = new Map<string, string>([
  ['Thumb_Up', 'Yes'],
  ['Thumb_Down', 'No'],
  ['Open_Palm', 'Hello'],
  ['Closed_Fist', 'Stop'],
  ['ILoveYou', 'I love you'],
  ['Victory', 'Peace'],
  ['Pointing_Up', 'Attention'],
]);

export const createGestureRecognizer = async (): Promise<boolean> => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numHands: 2,
      minHandDetectionConfidence: 0.3,
      minHandPresenceConfidence: 0.3,
      minTrackingConfidence: 0.3
    });
    
    console.log("Gesture recognizer created successfully");
    return true;
  } catch (error) {
    console.error("Error creating gesture recognizer:", error);
    return false;
  }
};

// Function to recognize gestures in video stream
export const recognizeGestures = (
  video: HTMLVideoElement, 
  currentTime: number,
  onNewGesture?: (gesture: RecognizedGesture) => void
): GestureRecognizerResult | null => {
  if (!gestureRecognizer) {
    console.log("Gesture recognizer not initialized");
    return null;
  }
  
  // The video is being processed at a different timestamp
  if (lastVideoTime !== currentTime) {
    lastVideoTime = currentTime;
    
    try {
      results = gestureRecognizer.recognizeForVideo(video, currentTime);
      
      if (results.gestures && results.gestures.length > 0 && results.landmarks) {
        console.log("Gesture detected:", results.gestures[0][0]);
        
        const gesture = results.gestures[0][0];
        
        // If the gesture has high enough confidence
        if (gesture.score > 0.6) {
          const recognizedGesture: RecognizedGesture = {
            gestureName: translateGesture(gesture.categoryName),
            confidence: gesture.score,
            timestamp: Date.now()
          };
          
          // Check if this is a new gesture (different from the last one)
          const lastGesture = gestureHistory.length > 0 ? gestureHistory[gestureHistory.length - 1] : null;
          
          // Only register a new gesture if it's different or 2 seconds have passed
          if (!lastGesture || 
              lastGesture.gestureName !== recognizedGesture.gestureName || 
              (recognizedGesture.timestamp - lastGesture.timestamp) > 2000) {
              
            gestureHistory.push(recognizedGesture);
            // Keep history manageable
            if (gestureHistory.length > 20) {
              gestureHistory.shift();
            }
            
            // Notify about new gesture
            if (onNewGesture) {
              onNewGesture(recognizedGesture);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error recognizing gesture:", error);
    }
  }
  
  return results;
};

// Translate raw gesture names to meaningful words
export const translateGesture = (gestureName: string): string => {
  return gestureToMeaning.get(gestureName) || gestureName;
};

// Get recent recognized gestures
export const getGestureHistory = (): RecognizedGesture[] => {
  return [...gestureHistory];
};

// Clear gesture history
export const clearGestureHistory = (): void => {
  gestureHistory.length = 0;
};

export const disposeGestureRecognizer = (): void => {
  if (gestureRecognizer) {
    gestureRecognizer.close();
    gestureRecognizer = null;
  }
};
