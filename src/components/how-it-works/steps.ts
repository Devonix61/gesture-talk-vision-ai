
import { 
  BrainCircuit, 
  FileText, 
  Mic, 
  Waves 
} from "lucide-react";

export const steps = [
  {
    icon: Waves,
    title: "Gesture Recognition",
    description: "Advanced AI detects and tracks hand movements, facial expressions, and posture in real-time.",
    details: "Using a custom-trained neural network model, our system captures subtle hand movements and gestures with exceptional accuracy. The recognition algorithm works across various lighting conditions and backgrounds.",
    color: "from-blue-400 to-blue-600",
    extendedContent: "Our gesture recognition system uses computer vision algorithms to identify and track over 40 distinct hand positions and movements. The model has been trained on diverse datasets representing different skin tones, lighting conditions, and camera angles to ensure consistent accuracy across different environments."
  },
  {
    icon: BrainCircuit,
    title: "Neural Processing",
    description: "Deep learning models interpret the sign language gestures and convert them to semantic meaning.",
    details: "Our specialized transformer-based architecture analyzes sequential gestures and their contextual relationships. The model has been trained on over 10,000 hours of diverse ISL gestures to understand regional variations and nuances.",
    color: "from-purple-400 to-purple-600",
    extendedContent: "The neural processing pipeline combines CNN and RNN architectures to understand both spatial and temporal aspects of sign language. Our system can recognize continuous signing, handling transitions between gestures and accounting for coarticulation effects where one sign influences the production of another."
  },
  {
    icon: FileText,
    title: "Grammar Correction",
    description: "AI restructures the raw interpretation into grammatically correct sentences.",
    details: "A natural language processing module refines the translated content to ensure proper syntax, grammar, and contextual meaning. This step transforms fragmentary inputs into coherent communication.",
    color: "from-indigo-400 to-indigo-600",
    extendedContent: "The grammar correction module uses a specialized language model fine-tuned on the mapping between ISL grammar and written language. It maintains the semantic intent of the original signing while adapting it to follow conventional grammar rules, making the output natural and easy to understand for non-signers."
  },
  {
    icon: Mic,
    title: "Voice Synthesis",
    description: "The translated text is converted to natural-sounding speech with appropriate emotion and intonation.",
    details: "Our emotional voice synthesis technology adds appropriate tone, pitch, and emotion to match the sentiment of the original signing. Users can customize voice characteristics to suit their preferences.",
    color: "from-sky-400 to-sky-600",
    extendedContent: "Our voice synthesis technology analyzes emotional cues from the original signing to produce speech with appropriate intonation, stress patterns, and emotional qualities. The system supports multiple voices and languages, allowing users to customize how their signed communication is vocalized."
  }
];
