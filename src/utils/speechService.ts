// Text-to-speech service for vocalization of translated text

// Enum for voice types
export enum VoiceType {
  MALE = 'male',
  FEMALE = 'female',
  NEUTRAL = 'neutral'
}

// Voice settings interface
export interface VoiceSettings {
  type: VoiceType;
  pitch: number; // 0.0 to 2.0
  rate: number;  // 0.1 to 10.0
  volume: number; // 0.0 to 1.0
}

// Default voice settings
export const defaultVoiceSettings: VoiceSettings = {
  type: VoiceType.NEUTRAL,
  pitch: 1.0,
  rate: 1.0,
  volume: 1.0
};

// Get available voices
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis.getVoices();
};

// Select voice based on settings
export const selectVoice = (settings: VoiceSettings): SpeechSynthesisVoice | null => {
  const voices = getAvailableVoices();
  
  if (voices.length === 0) return null;
  
  // Filter by gender if specified
  let genderVoices = voices;
  
  if (settings.type === VoiceType.MALE) {
    genderVoices = voices.filter(voice => voice.name.toLowerCase().includes('male'));
  } else if (settings.type === VoiceType.FEMALE) {
    genderVoices = voices.filter(voice => voice.name.toLowerCase().includes('female'));
  }
  
  // If no voices match the gender, use all voices
  if (genderVoices.length === 0) {
    genderVoices = voices;
  }
  
  // Prefer a voice based on browser language
  const langCode = navigator.language.substr(0, 2).toLowerCase();
  const localizedVoice = genderVoices.find(voice => 
    voice.lang.toLowerCase().startsWith(langCode));
  
  if (localizedVoice) return localizedVoice;
  
  // Fallback to the first voice in the filtered list
  return genderVoices[0];
};

// Function to speak text
export const speakText = (
  text: string, 
  settings: VoiceSettings = defaultVoiceSettings,
  onStart?: () => void,
  onEnd?: () => void
): void => {
  if (!text) return;
  
  // Stop any current speech
  stopSpeaking();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply voice settings
  const voice = selectVoice(settings);
  if (voice) utterance.voice = voice;
  
  utterance.pitch = settings.pitch;
  utterance.rate = settings.rate;
  utterance.volume = settings.volume;
  
  // Set event handlers
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  
  // Speak
  window.speechSynthesis.speak(utterance);
};

// Function to stop speaking
export const stopSpeaking = (): void => {
  window.speechSynthesis.cancel();
};

// Adjust voice based on sentiment
export const speakWithEmotion = (
  text: string, 
  emotion: 'positive' | 'negative' | 'neutral',
  settings: VoiceSettings = defaultVoiceSettings,
  onStart?: () => void,
  onEnd?: () => void
): void => {
  const emotionSettings = { ...settings };
  
  // Adjust settings based on emotion
  switch (emotion) {
    case 'positive':
      emotionSettings.pitch = Math.min(settings.pitch * 1.2, 2.0);
      emotionSettings.rate = Math.min(settings.rate * 1.1, 1.5);
      break;
    case 'negative':
      emotionSettings.pitch = Math.max(settings.pitch * 0.8, 0.7);
      emotionSettings.rate = Math.max(settings.rate * 0.9, 0.8);
      break;
    default:
      // Keep neutral settings
      break;
  }
  
  speakText(text, emotionSettings, onStart, onEnd);
};
