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

const gestureToMeaning = new Map<string, string>([
  // Current mappings
  ['Thumb_Up', 'Yes'],
  ['Thumb_Down', 'No'],
  ['Open_Palm', 'Hello'],
  ['Closed_Fist', 'Stop'],
  ['ILoveYou', 'I love you'],
  ['Victory', 'Peace'],
  ['Pointing_Up', 'Attention'],
  // Additional gestures
  ['Pointing_Down', 'Below'],
  ['Pointing_Left', 'Left'],
  ['Pointing_Right', 'Right'],
  ['Four_Fingers', 'Four'],
  ['Three_Fingers', 'Three'],
  ['Two_Fingers', 'Two'],
  ['One_Finger', 'One'],
  ['Pinch', 'Small'],
  ['Spread_Fingers', 'Big'],
  ['Waving_Hand', 'Goodbye'],
  ['Fist_Bump', 'Friend'],
  ['Letter_A', 'A'],
  ['Letter_B', 'B'],
  ['Letter_C', 'C'],
  ['Letter_D', 'D'],
  ['Letter_E', 'E'],
  // New gestures added
  ['Letter_F', 'F'],
  ['Letter_G', 'G'],
  ['Letter_H', 'H'],
  ['Letter_I', 'I'],
  ['Letter_J', 'J'],
  ['Letter_K', 'K'],
  ['Letter_L', 'L'],
  ['Letter_M', 'M'],
  ['Letter_N', 'N'],
  ['Letter_O', 'O'],
  ['Letter_P', 'P'],
  ['Letter_Q', 'Q'],
  ['Letter_R', 'R'],
  ['Letter_S', 'S'],
  ['Letter_T', 'T'],
  ['Letter_U', 'U'],
  ['Letter_V', 'V'],
  ['Letter_W', 'W'],
  ['Letter_X', 'X'],
  ['Letter_Y', 'Y'],
  ['Letter_Z', 'Z'],
  ['Five_Fingers', 'Five'],
  ['Six_Fingers', 'Six'],
  ['Seven_Fingers', 'Seven'], 
  ['Eight_Fingers', 'Eight'],
  ['Nine_Fingers', 'Nine'],
  ['Zero_Fingers', 'Zero'],
  ['Thank_You', 'Thank You'],
  ['Please', 'Please'],
  ['Help', 'Help'],
  ['Want', 'Want'],
  ['Need', 'Need'],
  ['Where', 'Where'],
  ['When', 'When'],
  ['Who', 'Who'],
  ['Why', 'Why'],
  ['How', 'How'],
  ['What', 'What'],
  ['Sorry', 'Sorry'],
  ['Eat', 'Eat'],
  ['Drink', 'Drink'],
  ['Family', 'Family'],
  ['School', 'School'],
  ['Work', 'Work'],
  ['Home', 'Home'],
  ['Name', 'Name'],
  ['Time', 'Time'],
  // Add more as needed, but allow showing "raw" name if no mapping provided
]);

/**
 * Modified to always include the raw gesture name if no mapping found.
 */
export const translateGesture = (gestureName: string): string => {
  // Capitalize and add spaces to the raw category for UI, e.g. "Open_Palm" => "Open Palm"
  const _prettify = (name: string) =>
    name.replace(/_/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  return gestureToMeaning.get(gestureName) || _prettify(gestureName);
};

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

export const recognizeGestures = (
  video: HTMLVideoElement, 
  currentTime: number,
  onNewGesture?: (gesture: RecognizedGesture) => void
): GestureRecognizerResult | null => {
  if (!gestureRecognizer) {
    console.log("Gesture recognizer not initialized");
    return null;
  }

  // Only process new frames
  if (lastVideoTime !== currentTime) {
    lastVideoTime = currentTime;

    try {
      results = gestureRecognizer.recognizeForVideo(video, currentTime);

      // Show all detected gestures by confidence
      if (results.gestures && results.gestures.length > 0 && results.landmarks) {
        // Directly support ALL detected gestures
        results.gestures[0].forEach(gesture => {
          if (gesture.score > 0.55) { // Slightly lowered for more coverage
            const recognizedGesture: RecognizedGesture = {
              gestureName: translateGesture(gesture.categoryName),
              confidence: gesture.score,
              timestamp: Date.now()
            };

            // Only register if new or enough time passed (per sign)
            const lastGesture = gestureHistory.length > 0 ? gestureHistory[gestureHistory.length - 1] : null;
            if (
              !lastGesture ||
              lastGesture.gestureName !== recognizedGesture.gestureName ||
              (recognizedGesture.timestamp - lastGesture.timestamp) > 2000
            ) {
              gestureHistory.push(recognizedGesture);
              if (gestureHistory.length > 20) gestureHistory.shift();
              if (onNewGesture) onNewGesture(recognizedGesture);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error recognizing gesture:", error);
    }
  }

  return results;
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
